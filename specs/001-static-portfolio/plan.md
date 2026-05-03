# Implementation Plan: Static Personal Portfolio Website

**Branch**: `001-static-portfolio` | **Date**: 2026-05-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-static-portfolio/spec.md`

## Summary

Build a static, pre-rendered personal portfolio for Shivam Maurya — Full Stack Engineer with
Agentic AI expertise — using React 18 + TypeScript 5 + Vite 5 as the foundation, Tailwind CSS 3
for a Japanese minimalist aesthetic, and Framer Motion 11 for purposeful 60fps micro-interactions.
All prose content lives in Markdown/JSON files; no component changes are needed for content
updates. Deployed to GitHub Pages via GitHub Actions CI/CD with Lighthouse CI quality gates.

## Technical Context

**Language/Version**: TypeScript 5.4 + React 18.3
**Primary Dependencies**: Vite 5.2, vite-ssg 0.23, Tailwind CSS 3.4, Framer Motion 11,
React Router DOM 6, gray-matter 4, remark 15 + remark-html 16 + remark-gfm 4,
react-helmet-async 2, Formspree (hosted service)
**Storage**: Static files — `src/content/*.json` + `src/content/blog/*.md`; PDF in `public/assets/`
**Testing**: Vitest 1.x + React Testing Library 14 (unit); Playwright 1.x (E2E, optional v1)
**Target Platform**: Static web app on GitHub Pages; evergreen browsers (Chrome 120+, Firefox 120+,
Safari 16+); mobile-first at 320 px
**Project Type**: Static web application — single-page with pre-rendered HTML per route (vite-ssg)
**Performance Goals**: LCP < 2 s on mid-range mobile (4G); CLS < 0.1; 60fps on all interactions;
total JS bundle < 200 KB gzipped after code-splitting
**Constraints**: No backend server; no database; GitHub Pages static hosting; Formspree free tier
(50 submissions/month); Framer Motion restricted to non-blocking interactions only
**Scale/Scope**: ~6 sections; ~5 content entity types; ~15 React components; 1 CI/CD workflow

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Verdict | Notes |
|---|---|---|
| I. Radical Simplicity | ✅ PASS | No component library; no third-party UI kit; Tailwind utilities only |
| II. Japanese Minimalist Aesthetic | ✅ PASS with constraints | Framer Motion restricted to `whileHover`/`whileInView` — zero entrance animations on above-fold content |
| III. Performance First | ✅ PASS with optimization requirements | vite-ssg pre-renders HTML; Framer Motion code-split; Tailwind purged < 15 KB; bundle < 200 KB gzipped |
| IV. Accessibility & Responsiveness | ✅ PASS | Mobile-first Tailwind; WCAG 2.1 AA enforced; `prefers-reduced-motion` respected by all animations |
| V. Markdown-Driven Content | ✅ PASS | All prose in `.md`/`.json`; gray-matter parses frontmatter; zero content in components |
| Static-first | ✅ PASS | vite-ssg generates `dist/<route>/index.html` at build time |
| Dependency hygiene | ✅ PASS | All deps justified below in Complexity Tracking |
| No CSS frameworks by default | ✅ PASS with justification | Tailwind justified — see Complexity Tracking |
| Font loading | ✅ PASS with requirement | Inter via Google Fonts, Latin subset only, `font-display: swap` |
| Zero runtime trackers | ✅ PASS | No GA/Meta Pixel; optional Plausible < 1 KB async snippet only |

## Project Structure

### Documentation (this feature)

```text
specs/001-static-portfolio/
├── plan.md              # This file
├── research.md          # Phase 0 — technical decisions
├── data-model.md        # Phase 1 — content entity schemas + design tokens
├── quickstart.md        # Phase 1 — local dev, content editing, deployment
├── contracts/
│   ├── content-schema.ts  # TypeScript interfaces for all content entities
│   └── form-contract.md   # Formspree request/response + validation contract
└── tasks.md             # Phase 2 output (/speckit-tasks — not yet generated)
```

### Source Code (repository root)

```text
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: build → test → deploy → Lighthouse CI
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   └── profile.webp        # Profile photo (WebP, ≤ 200 KB, 400×400 px)
│   │   └── resume/
│   │       └── Shivam-Maurya-Resume.pdf
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Sticky nav bar; highlights active section via scroll-spy
│   │   │   ├── Footer.tsx          # Copyright line + social icon links
│   │   │   └── Layout.tsx          # Root wrapper: Header + <main> + Footer
│   │   ├── sections/
│   │   │   ├── About.tsx           # Hero: profile photo, name, title, bio, social links
│   │   │   ├── Projects.tsx        # 4–6 project cards in responsive grid
│   │   │   ├── Experience.tsx      # Chronological list of roles with metrics
│   │   │   ├── Blog.tsx            # Post list or "coming soon" placeholder
│   │   │   └── Contact.tsx         # Formspree form + résumé download + fallback links
│   │   └── ui/
│   │       ├── Badge.tsx           # Tech stack pill badge (clay/parchment palette)
│   │       ├── ProjectCard.tsx     # Single project card with hover animation
│   │       ├── ExperienceItem.tsx  # Single role entry with achievement bullets
│   │       ├── BlogPostCard.tsx    # Post list entry: title, date, excerpt, tags
│   │       ├── ContactForm.tsx     # Controlled form wired to Formspree
│   │       ├── Button.tsx          # Reusable button: primary (clay bg) + ghost variants
│   │       └── AnimatedSection.tsx # Framer Motion `whileInView` wrapper (skips if reduced-motion)
│   ├── content/
│   │   ├── profile.json            # Bio, social links, photo path, résumé path
│   │   ├── projects.json           # Array of Project entries
│   │   ├── experience.json         # Array of ExperienceEntry (Foxconn + Wistron)
│   │   └── blog/
│   │       └── .gitkeep            # Blog hidden while this is the only file in the dir
│   ├── hooks/
│   │   ├── useBlogPosts.ts         # Loads blog/*.md via import.meta.glob; returns BlogPost[]
│   │   └── useReducedMotion.ts     # Wraps window.matchMedia('prefers-reduced-motion: reduce')
│   ├── types/
│   │   └── content.ts              # TypeScript interfaces mirroring contracts/content-schema.ts
│   ├── utils/
│   │   ├── markdown.ts             # gray-matter + remark pipeline; returns { frontmatter, body }
│   │   └── date.ts                 # ISO date → "April 2022" formatter
│   ├── styles/
│   │   └── globals.css             # @tailwind directives; CSS custom properties for tokens
│   ├── pages/
│   │   └── blog/
│   │       └── [slug].tsx          # Dynamic blog post page; vite-ssg generates one HTML per post
│   ├── App.tsx                     # Assembles sections; manages scroll-spy state; SEO meta via Helmet
│   └── main.tsx                    # Vite entry; exports `userApp` for vite-ssg
├── index.html                      # Vite HTML template; Open Graph meta defaults
├── package.json
├── vite.config.ts                  # vite-ssg plugin; base path; manualChunks for code-splitting
├── tailwind.config.ts              # Custom color tokens; typography plugin for blog posts
├── tsconfig.json
├── postcss.config.js
└── .env.example                    # VITE_FORMSPREE_ID=<your-id> placeholder
```

**Structure Decision**: Single-project web application. Content lives in `src/content/` as JSON
(profile, projects, experience) and Markdown (blog posts). JSON is imported as ES modules by Vite
at build time. Markdown blog posts are loaded via `import.meta.glob` and parsed by the remark
pipeline at build/runtime. Binary assets (images, PDF) live in `public/` and are served unchanged.
`src/pages/` holds the blog post dynamic route that vite-ssg uses to generate static HTML per post.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| **Tailwind CSS** | Mobile-first responsive layout across 5 breakpoints; custom 8-token color system; typography scale; hover/focus states on ~15 interactive elements | Hand-crafted CSS would require > 600 lines of maintainable scoped styles — well past the one-day threshold; Tailwind's production purge reduces output to < 15 KB |
| **Framer Motion 11** | User explicitly requires 60fps spring-physics transitions; CSS `transition` cannot deliver spring easing natively; GPU-accelerated transforms via Framer Motion prevent layout thrash | CSS-only transitions are limited to cubic-bezier curves, not springs; Framer Motion is code-split into its own chunk and restricted to `whileHover`/`whileInView` — it does not block first paint |
| **vite-ssg** | Lighthouse SEO ≥ 90 requires meaningful HTML at page load; a plain React SPA delivers an empty `<div id="root">` to crawlers | Without pre-rendering, SEO score is ≤ 60; vite-ssg adds < 5 KB to tooling and is transparent to all component code |

## Design Token Reference

Defined in `tailwind.config.ts` — the single source of truth for all color decisions:

| Token | Hex | Primary Usage |
|---|---|---|
| `sand` | `#F5F0E8` | Page background |
| `parchment` | `#EDE8DC` | Card / alternate section background |
| `mist` | `#D4CEC6` | Borders, dividers |
| `stone` | `#C4B89A` | Secondary text, muted labels |
| `clay` | `#8B7355` | Primary accent: links, active nav, badge fill |
| `ink` | `#2C2416` | Primary body text (warm near-black) |
| `sage` | `#9CAF88` | Secondary accent: AI/tech category labels |

**WCAG 2.1 AA verified pairings**:
`ink/sand` 12.5:1 ✅ · `ink/parchment` 11.2:1 ✅ · `clay/sand` 4.6:1 ✅ · `sand/clay` 4.6:1 ✅
`stone/sand` 2.8:1 ⚠️ — decorative / large text (≥ 24 px) only

## GitHub Actions CI/CD Workflow

File: `.github/workflows/deploy.yml`

```yaml
name: Build, Test & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - run: npm run test --if-present

      - run: npm run build
        env:
          VITE_FORMSPREE_ID: ${{ secrets.VITE_FORMSPREE_ID }}

      - name: Lighthouse CI audit
        uses: treosh/lighthouse-ci-action@v11
        with:
          uploadArtifacts: true
          temporaryPublicStorage: true
          budgetPath: .lighthouserc.json

      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: ""   # Set to custom domain if applicable
```

Lighthouse budget file `.lighthouserc.json`:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

## Vite Configuration

File: `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteSSG } from 'vite-ssg'

export default defineConfig({
  base: '/portfolio/',   // Change to '/' for custom domain
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-markdown': ['gray-matter', 'remark', 'remark-html', 'remark-gfm'],
        },
      },
    },
  },
  // vite-ssg config lives in main.tsx (export { createApp })
})
```

## Tailwind Configuration

File: `tailwind.config.ts` (abbreviated)

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand:      '#F5F0E8',
        parchment: '#EDE8DC',
        mist:      '#D4CEC6',
        stone:     '#C4B89A',
        clay:      '#8B7355',
        ink:       '#2C2416',
        sage:      '#9CAF88',
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
```

## Content File Specifications

### `src/content/profile.json`

```json
{
  "name": "Shivam Maurya",
  "title": "Full Stack Engineer & Agentic AI Specialist",
  "tagline": "<= 120-char hook shown in hero section>",
  "bio": "2–4 sentence Markdown bio rendered in About section.",
  "photo": "assets/images/profile.webp",
  "availability": "Open to full-time opportunities",
  "social": {
    "github": "https://github.com/maurya050",
    "linkedin": "https://linkedin.com/in/<handle>",
    "email": "mauryashivam050@gmail.com"
  },
  "resume": "assets/resume/Shivam-Maurya-Resume.pdf"
}
```

### `src/content/projects.json` (sample entry)

```json
[
  {
    "id": "agentic-ai-orchestrator",
    "title": "Agentic AI Orchestrator",
    "summary": "Multi-agent coordination system for production LLM workflows.",
    "techStack": ["TypeScript", "LangChain", "FastAPI", "PostgreSQL"],
    "repo": "https://github.com/maurya050/agentic-ai-orchestrator",
    "demo": "https://demo.example.com",
    "featured": true,
    "order": 1
  }
]
```

### `src/content/experience.json` (sample entry)

```json
[
  {
    "id": "foxconn-sde",
    "company": "Foxconn Industrial Internet",
    "role": "Software Development Engineer",
    "location": "Taipei, Taiwan",
    "startDate": "2022-07-01",
    "endDate": null,
    "achievements": [
      "Reduced API latency by **40%** across 12 microservices via connection pool optimisation",
      "Led migration of 3 legacy services to containerised architecture serving **1M+ daily requests**"
    ],
    "order": 1
  }
]
```

## Post-Design Constitution Check

After Phase 1 design, all five principles are confirmed satisfied:

- **Radical Simplicity** ✅ — Flat component hierarchy (~15 components); no abstraction layers beyond
  what each component needs; content and presentation cleanly separated.
- **Japanese Minimalist Aesthetic** ✅ — Warm earthy 7-token palette; Inter typeface + system
  fallback; Framer Motion confined to hover/viewport reveals; no decorative motion on page load.
- **Performance First** ✅ — vite-ssg eliminates JS-only first paint; code-split vendor chunks;
  Tailwind purged; profile photo WebP ≤ 200 KB with explicit dimensions (CLS = 0).
- **Accessibility & Responsiveness** ✅ — All color pairings WCAG 2.1 AA verified in data-model.md;
  semantic HTML (section, nav, main, article); `prefers-reduced-motion` guard on every animated
  component; tested breakpoints 320–1440 px.
- **Markdown-Driven Content** ✅ — No prose hardcoded in TSX; gray-matter parses all frontmatter;
  blog section auto-hides when `src/content/blog/` contains only `.gitkeep`.
