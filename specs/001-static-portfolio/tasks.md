---
description: "Task list for Static Personal Portfolio Website"
---

# Tasks: Static Personal Portfolio Website

**Input**: Design documents from `specs/001-static-portfolio/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Organization**: Tasks grouped by user story for independent implementation and delivery.
**Tests**: Not included — no TDD explicitly requested in spec. Add manually if desired.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Parallelizable — different files, no unresolved dependencies
- **[Story]**: US1–US5 maps to spec.md user story priorities

---

## Phase 1: Setup

**Purpose**: Initialize the Vite + React + TypeScript project and all configuration files.

- [ ] T001 Scaffold Vite project: run `npm create vite@latest . -- --template react-ts` in repo root, confirm `src/` and `index.html` are created
- [ ] T002 Install all dependencies: `npm install react-router-dom framer-motion react-helmet-async gray-matter remark remark-html remark-gfm` and devDeps `tailwindcss postcss autoprefixer @tailwindcss/typography vite-ssg`
- [ ] T003 [P] Create `vite.config.ts` with vite-ssg plugin, `base: '/portfolio/'`, and `manualChunks` splitting `vendor-react`, `vendor-framer`, `vendor-markdown` per plan.md
- [ ] T004 [P] Create `tailwind.config.ts` with 7 custom color tokens (sand, parchment, mist, stone, clay, ink, sage), Inter font family, and `@tailwindcss/typography` plugin per plan.md
- [ ] T005 [P] Create `tsconfig.json` with `strict: true`, `moduleResolution: bundler`, `jsx: react-jsx`, and path alias `@/` → `src/`
- [ ] T006 [P] Create `postcss.config.js` with `tailwindcss` and `autoprefixer` plugins
- [ ] T007 [P] Create `src/styles/globals.css` with `@tailwind base/components/utilities` directives and CSS custom properties for all 7 design tokens
- [ ] T008 [P] Update `index.html`: add `<link>` for Inter variable font (Google Fonts, Latin subset, `font-display=swap`), default Open Graph meta tags (title, description, og:image placeholder)
- [ ] T009 [P] Create `public/` directory structure: `public/assets/images/.gitkeep`, `public/assets/resume/.gitkeep`, `public/robots.txt` (allow all), `public/favicon.svg` (minimal ink-colored monogram)
- [ ] T010 [P] Create `.env.example` with `VITE_FORMSPREE_ID=your_form_id_here` and `VITE_BASE_URL=http://localhost:5173`; add `.env.local` to `.gitignore`
- [ ] T011 [P] Create `.github/workflows/deploy.yml` with the full CI/CD workflow from plan.md (checkout → setup-node → npm ci → npm test → npm run build → Lighthouse CI → deploy to gh-pages)
- [ ] T012 [P] Create `.lighthouserc.json` with Lighthouse budget asserting Performance ≥ 0.9, Accessibility ≥ 0.95, Best Practices ≥ 0.9, SEO ≥ 0.9

**Checkpoint**: `npm run dev` starts without errors; empty app renders at localhost:5173

---

## Phase 2: Foundational

**Purpose**: Shared types, utilities, hooks, and UI primitives that every user story depends on.

⚠️ **CRITICAL**: No user story implementation can begin until this phase is complete.

- [ ] T013 Create `src/types/content.ts` with TypeScript interfaces: `Profile`, `ProfileSocial`, `Project`, `ExperienceEntry`, `BlogPostFrontmatter`, `BlogPost`, `ContactFormData`, `ContactFormStatus`, `ContactFormState` — mirroring `contracts/content-schema.ts` exactly
- [ ] T014 [P] Create `src/utils/date.ts`: export `formatDate(iso: string): string` that converts `"2022-07-01"` → `"July 2022"` and `null` → `"Present"`
- [ ] T015 [P] Create `src/utils/markdown.ts`: export `parseMarkdown(raw: string): Promise<{ frontmatter: Record<string, unknown>; body: string }>` using gray-matter for frontmatter and remark → remark-gfm → remark-html pipeline for body
- [ ] T016 [P] Create `src/hooks/useReducedMotion.ts`: export `useReducedMotion(): boolean` wrapping `window.matchMedia('(prefers-reduced-motion: reduce)').matches` with a change-event listener
- [ ] T017 [P] Create `src/components/ui/Badge.tsx`: pill badge rendering a single tech-stack label string; bg-clay/10 text-clay, rounded-full, px-2.5 py-0.5 text-xs font-medium; accepts `label: string` prop
- [ ] T018 [P] Create `src/components/ui/Button.tsx`: two variants — `primary` (bg-clay text-sand hover:bg-clay/90) and `ghost` (border border-clay text-clay hover:bg-clay/10); accepts `variant`, `href` (renders `<a>` if set), `onClick`, `disabled`, `children`; `cursor-not-allowed opacity-50` when disabled
- [ ] T019 [P] Create `src/components/ui/AnimatedSection.tsx`: wraps children in `<motion.div>` with `whileInView={{ opacity: 1, y: 0 }}` initial `{{ opacity: 0, y: 16 }}`; `viewport={{ once: true, margin: '-80px' }}`; `transition={{ duration: 0.4, ease: 'easeOut' }}`; calls `useReducedMotion()` and renders a plain `<div>` instead when reduced motion is preferred
- [ ] T020 Create `src/components/layout/Header.tsx`: sticky top-0 nav with site name/logo (ink), section links (Home, Projects, Experience, Contact; Blog only when posts exist); active link highlighted in clay; smooth-scroll `href="#section-id"` on click; mobile hamburger collapses to full-width dropdown
- [ ] T021 [P] Create `src/components/layout/Footer.tsx`: single-line footer with copyright (`© 2026 Shivam Maurya`) and three social icon links (GitHub, LinkedIn, Email) using inline SVG icons; text-stone hover:text-clay
- [ ] T022 Create `src/components/layout/Layout.tsx`: renders `<Header />` + `<main className="min-h-screen bg-sand text-ink">{children}</main>` + `<Footer />`; accepts `showBlogNav: boolean` prop passed down to Header
- [ ] T023 Create `src/content/profile.json` with placeholder content matching the `Profile` interface: name "Shivam Maurya", title "Full Stack Engineer & Agentic AI Specialist", tagline placeholder, bio placeholder, social links with `maurya050` GitHub, `mauryashivam050@gmail.com` email, resume path
- [ ] T024 [P] Create `src/content/projects.json` with 5 placeholder project entries (featured: true, order 1–5) each with id, title, summary, techStack array (3–5 items), repo URL placeholder, optional demo placeholder
- [ ] T025 [P] Create `src/content/experience.json` with 2 entries: Foxconn (id: "foxconn", endDate: null, order: 1) and Wistron (id: "wistron", order: 2) — each with role, location, startDate, endDate, and 3 achievement bullet placeholders including metric markers

**Checkpoint**: `tsc --noEmit` passes; all imports resolve; dev server still starts

---

## Phase 3: User Story 1 — First Impression & Professional Identity (Priority: P1) 🎯 MVP

**Goal**: Hero/About section renders profile photo, name, title, bio, and social links above the fold.

**Independent Test**: Render About section in isolation; a viewer with no prior context can identify Shivam's specialty and find GitHub/LinkedIn/email links without scrolling twice on a 375px mobile screen.

### Implementation for User Story 1

- [ ] T026 [P] [US1] Create `src/components/sections/About.tsx`: full-bleed hero section (`id="about"`) with profile photo (`<img src={profile.photo} alt="Shivam Maurya — portrait" className="..." />` with explicit 200×200 dimensions to prevent CLS), name as `<h1>`, title as `<p>`, tagline as styled subtitle, bio rendered from Markdown via `dangerouslySetInnerHTML` (sanitized by remark-html), and three icon+text social links (GitHub, LinkedIn, Email) using Button ghost variant; imports profile.json directly
- [ ] T027 [US1] Create `src/App.tsx` with single `<Layout>` containing only `<About />`; add `<HelmetProvider>` wrapping; set page title and meta description via `<Helmet>` based on profile.name and profile.tagline; export `createApp` for vite-ssg
- [ ] T028 [US1] Create `src/main.tsx`: import `createApp` from `./App`; export `{ createApp }` for vite-ssg SSG mode; keep browser hydration entry
- [ ] T029 [US1] Wrap `<About />` in `<AnimatedSection>` — verify no animation fires before profile photo is painted (above-fold content must not delay LCP)

**Checkpoint**: `npm run build && npm run preview` → About section visible, photo loads, social links clickable, no layout shift on photo load

---

## Phase 4: User Story 2 — Projects Portfolio Browsing (Priority: P2)

**Goal**: Projects section shows 4–6 featured cards with title, summary, tech stack badges, and working repo/demo links.

**Independent Test**: Projects section renders standalone; evaluator can read all cards, see badges, and open at least one repo link in a new tab; at 320px no content overflows.

### Implementation for User Story 2

- [ ] T030 [P] [US2] Create `src/components/ui/ProjectCard.tsx`: accepts a `Project` prop; renders `<article>` with bg-parchment border-mist, title as `<h3>`, summary as `<p>`, row of `<Badge>` components for techStack, and conditional `<Button href={repo}>` and `<Button href={demo}>` links (each `target="_blank" rel="noopener noreferrer"`); demo button absent when `project.demo` is undefined; wrap card in `<motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>` guarded by `useReducedMotion()`
- [ ] T031 [US2] Create `src/components/sections/Projects.tsx`: section (`id="projects"`) heading "Projects" as `<h2>`; reads `projects.json`, filters `featured === true`, sorts by `order`; renders a responsive grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`; each item wrapped in `<AnimatedSection>`; wraps grid in `<ProjectCard>` per item
- [ ] T032 [US2] Add `<Projects />` to `src/App.tsx` below `<About />`; add "Projects" link to Header (already scaffolded in T020 — verify `href="#projects"` resolves correctly)

**Checkpoint**: 4–6 project cards render; badges visible; repo link opens in new tab; 320px viewport — no horizontal scroll

---

## Phase 5: User Story 3 — Experience & Achievements Review (Priority: P3)

**Goal**: Experience section lists Foxconn and Wistron roles with job title, dates, and metric-bearing achievement bullets.

**Independent Test**: Experience section renders standalone; reviewer can see both employers, role titles, date ranges, and at least one numerical metric per role.

### Implementation for User Story 3

- [ ] T033 [P] [US3] Create `src/components/ui/ExperienceItem.tsx`: accepts `ExperienceEntry` prop; renders `<article>` with company name as `<h3>`, role as `<p className="font-medium">`, `formatDate(startDate)` + " – " + `formatDate(endDate)` as `<time>`, location as `<span>`, and `<ul>` of achievement bullets; each bullet renders Markdown inline (bold metrics via `dangerouslySetInnerHTML`); left border accent `border-l-2 border-clay pl-4`
- [ ] T034 [US3] Create `src/components/sections/Experience.tsx`: section (`id="experience"`) heading "Experience" as `<h2>`; reads `experience.json`, sorts by `order`; renders `<ExperienceItem>` per entry wrapped in `<AnimatedSection>`; vertical spacing `space-y-10`
- [ ] T035 [US3] Add `<Experience />` to `src/App.tsx` below `<Projects />`; verify "Experience" nav link in Header resolves

**Checkpoint**: Both Foxconn and Wistron entries visible; dates formatted; bullet metrics bolded; mobile — no text truncated

---

## Phase 6: User Story 4 — Contact & Resume Download (Priority: P4)

**Goal**: Contact section delivers a working Formspree form, résumé PDF download, and permanent email/LinkedIn fallback links.

**Independent Test**: Contact section in isolation — submit form with valid inputs and see success state; submit with empty field and see per-field error; click résumé link and confirm PDF download; fallback email/LinkedIn links always visible.

### Implementation for User Story 4

- [ ] T036 [P] [US4] Create `src/components/ui/ContactForm.tsx`: controlled form with `name`, `email`, `message` fields; `ContactFormState` state (idle/submitting/success/error); client-side validation on blur per `contracts/form-contract.md` rules; on submit `fetch('https://formspree.io/f/' + import.meta.env.VITE_FORMSPREE_ID, { method: 'POST', headers: { Accept: 'application/json' }, body: JSON.stringify(data) })`; on 200 → success state (hide form, show confirmation + reset link); on error → show message + keep form populated; Send button `disabled` during submitting; all inputs have associated `<label>` and `aria-describedby` for error messages
- [ ] T037 [US4] Create `src/components/sections/Contact.tsx`: section (`id="contact"`) heading "Contact" as `<h2>`; two-column layout on md+ (form left, links right) collapsing to single column on mobile; resume download as `<Button href={profile.resume} download>Download Résumé</Button>` (shows placeholder text when `profile.resume` is empty string); permanent fallback block with `mailto:` link and LinkedIn URL always rendered below the form
- [ ] T038 [US4] Add `<Contact />` to `src/App.tsx` below `<Experience />`; verify "Contact" nav link resolves

**Checkpoint**: Form validates on blur; success state renders on mock submit; résumé link downloads PDF; fallback links visible at all times; form accessible via keyboard only

---

## Phase 7: User Story 5 — Blog Post Reading (Priority: P5 — Optional)

**Goal**: Blog section shows post list when `.md` files exist; is hidden from nav when only `.gitkeep` is present.

**Independent Test**: (a) With `.gitkeep` only — Blog nav link hidden, no broken page. (b) With one `.md` post (`published: true`) — Blog nav appears, list renders title + date + excerpt; clicking opens post page with full Markdown rendered.

### Implementation for User Story 5

- [ ] T039 [P] [US5] Create `src/hooks/useBlogPosts.ts`: use `import.meta.glob('../../content/blog/*.md', { as: 'raw', eager: false })` to discover post files; for each file, run `parseMarkdown()` from `src/utils/markdown.ts`; compute `slug` from filename (`/.*\/(.+)\.md$/`); compute `readingTime` as `Math.ceil(wordCount / 200)`; filter `published === true`; sort by `date` descending; return `BlogPost[]`
- [ ] T040 [P] [US5] Create `src/components/ui/BlogPostCard.tsx`: accepts `BlogPost` prop (without `body`); renders `<article>` with post title as `<h3>` (link to `/blog/${slug}`), formatted date, excerpt `<p>`, and tag `<Badge>` row; hover: title underline transition
- [ ] T041 [US5] Create `src/components/sections/Blog.tsx`: section (`id="blog"`); calls `useBlogPosts()`; if `posts.length === 0` render `null` (hidden); if ≥ 1 render heading "Writing" as `<h2>` and `<BlogPostCard>` list wrapped in `<AnimatedSection>`
- [ ] T042 [US5] Create `src/pages/blog/[slug].tsx`: dynamic route; receives `slug` param via React Router; loads matching post via `useBlogPosts()` (find by slug); renders `<article>` with `<h1>` title, formatted date, tags, and `<div className="prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: post.body }}`; 404 fallback if slug not found; vite-ssg `getStaticPaths()` export returning all published slugs
- [ ] T043 [US5] Add Blog route to vite-ssg route list in `src/main.tsx`; add `<Blog />` to `src/App.tsx` below `<Experience />` and above `<Contact />`; pass `showBlogNav={posts.length > 0}` to Layout
- [ ] T044 [US5] Add `src/content/blog/.gitkeep` (already created in T009); verify Blog hidden; create a test post `src/content/blog/hello-world.md` with valid frontmatter (`published: true`) and verify Blog appears; delete test post before final commit

**Checkpoint**: `.gitkeep` only → Blog nav hidden; with a published `.md` → list renders, post page loads with Markdown content, `<title>` updates per `<Helmet>`

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Finalize scroll-spy, accessibility, content, and production quality gates.

- [ ] T045 [P] Add scroll-spy to `src/App.tsx`: use `IntersectionObserver` watching `#about`, `#projects`, `#experience`, `#contact` (and `#blog` when visible); pass `activeSection` string down to `<Header>` to highlight the current nav link in clay
- [ ] T046 [P] Replace all placeholder content in `src/content/profile.json` with real values: actual bio, tagline, GitHub URL, LinkedIn URL, availability status; commit actual `public/assets/images/profile.webp` (≤ 200 KB)
- [ ] T047 [P] Replace placeholder entries in `src/content/projects.json` with 4–6 real projects; each entry must have at least one of `repo` or `demo`; verify techStack badge arrays are correct
- [ ] T048 [P] Replace placeholder entries in `src/content/experience.json` with real Foxconn and Wistron data; each achievement bullet must contain at least one measurable metric
- [ ] T049 [P] Place actual `Shivam-Maurya-Resume.pdf` in `public/assets/resume/`; update `src/content/profile.json` `resume` field to match exact filename
- [ ] T050 [P] Verify all WCAG 2.1 AA color pairings in browser devtools: ink/sand, ink/parchment, clay/sand, sand/clay must all pass; stone/sand only used for decorative/large-text contexts
- [ ] T051 Run `npm run build` — confirm zero TypeScript errors, zero Vite warnings; inspect `dist/` to confirm vite-ssg generated individual `index.html` files per route
- [ ] T052 [P] Run `npm run preview` — smoke test at 320px, 768px, 1024px, 1440px: no horizontal scroll at any width; all nav links scroll to correct section; profile photo loads without layout shift
- [ ] T053 [P] Run Lighthouse audit against production preview (`npx lhci autorun`): verify Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90; fix any failures before merge
- [ ] T054 [P] Content edit test: add a new project entry to `src/content/projects.json`, run `npm run build`, confirm new card appears in `dist/` output without any component code changes (validates SC-005)
- [ ] T055 [P] Verify GitHub Actions workflow syntax: run `act -n` (dry-run) or push to a draft branch; confirm build → test → Lighthouse → deploy steps all green
- [ ] T056 Keyboard navigation audit: tab through entire page — verify focus ring visible on all interactive elements (Header links, social links, project card links, form fields, Send button, résumé download link); no focus traps; skip-to-content link present

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001–T012) — BLOCKS all user story work
- **US1 (Phase 3)**: Depends on Foundational completion — MVP deliverable
- **US2 (Phase 4)**: Depends on Foundational; can run after US1 (or in parallel with US1 if staffed)
- **US3 (Phase 5)**: Depends on Foundational; independent of US1 and US2
- **US4 (Phase 6)**: Depends on Foundational; independent; requires Formspree ID in `.env.local`
- **US5 (Phase 7)**: Depends on Foundational + T015 (markdown.ts); independent of US1–US4
- **Polish (Phase 8)**: Depends on all desired user story phases being complete

### User Story Dependencies

- **US1** → no story deps; needs T013–T025 (types, utils, UI primitives, layout, content)
- **US2** → needs T017 (Badge), T018 (Button), T019 (AnimatedSection), T024 (projects.json)
- **US3** → needs T014 (date.ts), T025 (experience.json)
- **US4** → needs T018 (Button), T036 (ContactForm); needs `VITE_FORMSPREE_ID` in env
- **US5** → needs T015 (markdown.ts), T016 (useReducedMotion), T039 (useBlogPosts)

### Within Each Phase

- All `[P]`-marked tasks in a phase can be worked simultaneously
- Non-`[P]` tasks wait for their dependencies within the same phase
- Each phase is independently buildable and verifiable before moving on

---

## Parallel Example: Foundational Phase

```bash
# All these can run simultaneously (different files):
T014: src/utils/date.ts
T015: src/utils/markdown.ts
T016: src/hooks/useReducedMotion.ts
T017: src/components/ui/Badge.tsx
T018: src/components/ui/Button.tsx
T019: src/components/ui/AnimatedSection.tsx
T021: src/components/layout/Footer.tsx
T024: src/content/projects.json
T025: src/content/experience.json

# Then sequentially (each depends on the above):
T020: Header.tsx (needs Badge, Button)
T022: Layout.tsx (needs Header, Footer)
T023: profile.json (reference only, can be parallel)
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1: Setup (T001–T012)
2. Complete Phase 2: Foundational (T013–T025) — this unblocks everything
3. Complete Phase 3: US1 (T026–T029)
4. **STOP and validate**: About section visible, photo loads, social links work, mobile responsive
5. Deploy to GitHub Pages preview branch if desired

### Incremental Delivery

1. Setup + Foundational → working skeleton
2. + US1 → MVP: visible identity, above-fold content, social links
3. + US2 → adds project showcase: technical evaluators can review work
4. + US3 → adds experience: HR / interviewers can verify background
5. + US4 → adds conversion: recruiters can send messages and download résumé
6. + US5 → adds thought leadership: blog visible when first post published
7. Polish → quality gates pass; content is real; CI/CD verified

---

## Notes

- `[P]` tasks touch different files; they can be assigned to separate agents or worked simultaneously
- Content JSON files (T023–T025) can be filled with real data any time before Phase 8
- `VITE_FORMSPREE_ID` must be set in `.env.local` before testing US4 locally
- The blog section is zero-config hidden: no posts in `src/content/blog/` = no blog nav link
- All Framer Motion usage MUST call `useReducedMotion()` before any animation runs
- Run `tsc --noEmit` after every phase to catch type errors early
