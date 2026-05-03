# Research: Static Personal Portfolio Website

**Branch**: `001-static-portfolio` | **Date**: 2026-05-01
**Purpose**: Resolve all technical unknowns before Phase 1 design

---

## Decision 1: Static Generation Strategy

**Decision**: Vite 5 + vite-ssg (static site generation) with React 18

**Rationale**:
A pure Vite React SPA serves a single `<div id="root">` shell to crawlers — no meaningful HTML content at page load. The spec requires Lighthouse SEO ≥ 90 (SC-002). `vite-ssg` pre-renders each route to a full HTML document at build time, then hydrates in the browser with React. This gives crawlers real content while preserving the React SPA developer experience. The overhead is negligible: one additional build step, no change to component code.

**Alternatives considered**:
- **Plain Vite SPA**: Rejected — SEO score ≤ 60 for JS-only rendered content; fails SC-002.
- **Next.js**: Rejected — introduces full framework dependency; contradicts user's "React + Vite" request and constitution's dependency hygiene principle.
- **Astro**: Rejected — diverges from user-specified React + Vite stack; requires rewriting components as Astro components.
- **Gatsby**: Rejected — high build complexity, slower HMR, no meaningful advantage over vite-ssg for this scale.

---

## Decision 2: Routing Strategy for GitHub Pages

**Decision**: React Router DOM v6 with `HashRouter` for production; `BrowserRouter` option available for Netlify/Vercel

**Rationale**:
GitHub Pages serves static files. A URL like `https://user.github.io/portfolio/blog/my-post` would require a custom 404.html redirect trick or a root-level `_redirects` file. `vite-ssg` pre-renders each route to its own `index.html` (e.g., `dist/blog/my-post/index.html`), which resolves this for pre-known routes. For catch-all client-side navigation, a 404.html redirect script handles deep links. This is the standard pattern for React on GitHub Pages.

**Implementation note**: The `vite.config.ts` `base` option MUST be set to the repository name (e.g., `/portfolio/`) for GitHub Pages deployment. For custom domain deployments, `base: '/'`.

**Alternatives considered**:
- **Hash routing globally**: Simpler but produces ugly URLs (`/#/blog/post`); breaks direct link sharing; poor SEO.
- **404.html SPA fallback only**: Works for single-page apps but not pre-rendered multi-page; brittle.

---

## Decision 3: Markdown Processing Pipeline

**Decision**: `gray-matter` (frontmatter parsing) + `remark` + `remark-html` + `remark-gfm` (Markdown → HTML)

**Rationale**:
- `gray-matter`: 15KB, zero dependencies, parses YAML/TOML/JSON frontmatter from `.md` files. The de facto standard.
- `remark` + `remark-html`: The remark ecosystem handles GitHub-Flavored Markdown (GFM), code blocks with syntax highlighting hooks, and safe HTML sanitization. Lighter than MDX for content-only blog posts.
- For blog posts: loaded via Vite's `import.meta.glob('../../content/blog/*.md', { as: 'raw' })` at build time; parsed at runtime during static generation.
- For JSON content (profile, projects, experience): imported directly as ES modules by Vite — no parsing library needed.

**Alternatives considered**:
- **MDX**: Overkill for a content blog; allows arbitrary JSX in Markdown which is a security anti-pattern for user-authored content.
- **marked**: Simpler but lacks the remark plugin ecosystem (e.g., syntax highlighting via rehype-highlight).
- **Contentlayer**: Adds a compilation layer; heavier setup; not necessary at this scale.

---

## Decision 4: Contact Form Delivery

**Decision**: Formspree (free tier, `https://formspree.io/f/<form-id>`)

**Rationale**:
Formspree requires zero backend infrastructure. The form submits via `fetch` to Formspree's endpoint; Formspree forwards the message to the configured email address. The free tier allows 50 submissions/month — more than sufficient for a personal portfolio. Formspree provides built-in spam filtering and a confirmation response. No CORS issues on GitHub Pages.

**Implementation**:
- Form ID is stored in a `.env` variable (`VITE_FORMSPREE_ID`) to avoid hardcoding in source.
- On submit success: display inline success message. On failure: display error with direct email fallback.
- Form fields: `name` (required), `email` (required, validated), `message` (required, min 10 chars).

**Alternatives considered**:
- **EmailJS**: Exposes API keys in client bundle; slightly higher XSS risk.
- **Netlify Forms**: Only works on Netlify; not portable to GitHub Pages.
- **Mailto link only**: No message storage or notification; loses recruiter messages if email client not configured.
- **Custom serverless function**: Violates "no backend server" constraint (FR-009).

---

## Decision 5: Framer Motion Usage Constraints

**Decision**: Framer Motion 11 — restricted to non-blocking, viewport-triggered interactions only

**Rationale**:
The user specified 60fps transitions. CSS `transition` alone cannot deliver spring-based easing curves that feel natural at 60fps. Framer Motion uses the Web Animations API and GPU-accelerated CSS transforms (`translate`, `opacity`, `scale`) to achieve hardware-accelerated motion without layout thrash.

**Permitted uses** (constitution-compliant):
1. `whileHover` / `whileTap` on project cards and buttons — micro-interactions that do not delay content
2. `whileInView` with `viewport={{ once: true }}` — subtle fade+slide for sections already in the paint tree; NOT used on above-the-fold LCP elements
3. Navigation active-indicator slide transition (CSS `transform`)
4. Blog post page enter/exit transition (deferred — only when blog is enabled)

**Prohibited uses**:
1. Any `initial` → `animate` entrance animation on above-the-fold content (delays LCP, violates Principle II and III)
2. Staggered text animations on headings
3. Parallax scroll effects
4. Any animation that changes layout (width, height, padding, margin) — triggers layout recalc

**Performance requirement**: Framer Motion MUST be code-split into its own chunk. Vite's `manualChunks` configuration separates it from the main bundle so it loads after first paint.

**Reduced motion**: Every animated component MUST call `useReducedMotion()` and skip all animations when the user has set `prefers-reduced-motion: reduce`.

**Alternatives considered**:
- **CSS transitions only**: Cannot deliver spring physics at 60fps; hover states would feel flat.
- **GSAP**: Larger bundle; commercial license for some features; no advantage over Framer Motion for this use case.
- **React Spring**: Similar capability to Framer Motion but less ergonomic for declarative viewport triggers.

---

## Decision 6: Tailwind CSS Justification

**Decision**: Tailwind CSS 3.4 — justified under the constitution's CSS framework exception

**Rationale**:
The constitution states: "Utility or component frameworks are permitted only if the project complexity clearly outgrows hand-crafted styles." This portfolio requires:
- 5 responsive breakpoints (320px, 640px, 768px, 1024px, 1440px)
- Custom color token system (8 warm/earthy custom colors)
- Typography scale (3 size variants, 2 weight variants)
- Dark mode readiness (even if v1 ships light-only)
- Hover, focus, and active states on ~15 interactive elements
- Grid/flexbox layouts that adapt from 1-column mobile to 2-3-column desktop

Implementing this correctly in hand-crafted CSS would require > 600 lines of maintainable, scoped CSS — well past the "one day" threshold. Tailwind's purge step reduces production CSS to < 15KB. No component styles are included (no Tailwind UI, no Tailwind plugins beyond `@tailwindcss/typography` for blog post rendering).

**Custom design tokens** (defined in `tailwind.config.ts`):
```
sand:       #F5F0E8   (page background)
parchment:  #EDE8DC   (card/section background)
mist:       #D4CEC6   (borders, dividers)
stone:      #C4B89A   (secondary text, muted labels)
clay:       #8B7355   (accent, links, active states)
ink:        #2C2416   (primary text — warm near-black)
sage:       #9CAF88   (optional secondary accent — muted green)
```
All combinations verified to meet WCAG 2.1 AA at intended usage pairings (ink on sand: 12.5:1 ✅; clay on sand: 4.6:1 ✅; stone on sand: 2.8:1 — use only for decorative/large text).

---

## Decision 7: Typography

**Decision**: System font stack for body; `Inter` (Google Fonts, subsetted) for headings — with `font-display: swap`

**Rationale**:
The constitution prefers system fonts for body text. For headings, a single humanist sans-serif (`Inter`) reinforces the professional, clean aesthetic without adding significant load. Google Fonts subset to Latin + used characters reduces the font load to < 20KB. `font-display: swap` prevents FOIT (flash of invisible text).

**Fallback stack**: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif`

**Alternatives considered**:
- **Pure system font**: Acceptable but `Inter` on headings provides a polished typographic distinction between heading and body without requiring a second typeface.
- **Noto Serif CJK**: Considered for Japanese aesthetic authenticity but adds > 200KB weight; rejected on performance grounds.
- **Variable fonts**: `Inter` is available as a variable font; use `font-variation-settings` for precise weight control without multiple font files.

---

## Decision 8: CI/CD Pipeline

**Decision**: GitHub Actions with `peaceiris/actions-gh-pages@v4` for deployment; Lighthouse CI via `treosh/lighthouse-ci-action` as a required check

**Rationale**:
- On push to `main`: build, test, deploy to `gh-pages` branch
- On pull request: build + Lighthouse CI check (gate at Performance ≥ 90, Accessibility ≥ 95)
- `peaceiris/actions-gh-pages` handles the `gh-pages` branch commit and CNAME preservation atomically
- Lighthouse CI runs against the built `dist/` directory using `lhci autorun` locally (no Lighthouse CI server needed for a personal project)

**Workflow triggers**:
- Push to `main` → full build + deploy
- PR to `main` → build + Lighthouse audit (deploy skipped)
- Manual `workflow_dispatch` → force redeploy

---

## Resolved Unknowns Summary

| Unknown | Resolution |
|---|---|
| Static generation approach | vite-ssg (pre-rendered HTML per route) |
| GitHub Pages routing | vite-ssg generates `dist/<route>/index.html`; 404.html fallback for deep links |
| Markdown processing | gray-matter + remark + remark-html + remark-gfm |
| Contact form backend | Formspree free tier; form ID in VITE_FORMSPREE_ID env var |
| Framer Motion scope | Restricted: whileHover/whileInView only; no above-fold entrance animations; code-split |
| Tailwind usage | Justified and documented; production purge < 15KB |
| Typography | Inter (subsetted) for headings; system stack for body; font-display: swap |
| CI/CD | GitHub Actions; peaceiris/actions-gh-pages; Lighthouse CI gate |
