# Portfolio Redesign — Fill & Recolor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every section denser and darker — Warm Amber palette with alternating cream/dark-walnut sections, bio + skills strip in About, richer project entries, tech tags on Experience roles, two-column Contact with CTA.

**Architecture:** All changes are in-place edits to existing components and content files. No new routes, sections, or components beyond a `variant="dark"` addition to `Badge`. Color tokens in `tailwind.config.ts` + `globals.css` flow through to all components automatically. Content changes (tech tags) are in `experience.json` and gated by a new optional `techTags` field on the `ExperienceEntry` type.

**Tech Stack:** React 18, TypeScript, Tailwind CSS 3, Vite. Verify changes with `npm run build` (tsc + vite build). No test framework in project — use build output + `npm run dev` visual check as verification.

---

## File Map

| File | Change |
|---|---|
| `src/styles/globals.css` | Update CSS variable hex values |
| `tailwind.config.ts` | Update color token hex values |
| `src/components/ui/Badge.tsx` | Add `variant="dark"` |
| `src/types/content.ts` | Add `techTags?: string[]` to `ExperienceEntry` |
| `src/content/experience.json` | Add `techTags` arrays per entry |
| `src/components/layout/Header.tsx` | Bolder logo, darker nav links |
| `src/components/sections/About.tsx` | Remove min-h-screen, render bio, add skills strip |
| `src/components/sections/Projects.tsx` | Dark bg, eyebrow, split summary, dark badges/buttons |
| `src/components/sections/Experience.tsx` | Eyebrow label |
| `src/components/ui/ExperienceItem.tsx` | Amber bullet dots, render techTags |
| `src/components/sections/Contact.tsx` | Two-column CTA layout |

---

## Task 1: Color Tokens

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update CSS variables in globals.css**

Replace the entire `:root` block:

```css
:root {
  --color-sand:      #F7F3ED;
  --color-parchment: #EDE8DC;
  --color-mist:      #D8D0C0;
  --color-stone:     #8B6B4A;
  --color-clay:      #C8864A;
  --color-ink:       #1A1208;
  --color-sage:      #7A9A68;
}
```

- [ ] **Step 2: Update Tailwind color tokens**

Replace the `colors` block in `tailwind.config.ts`:

```ts
colors: {
  sand:      '#F7F3ED',
  parchment: '#EDE8DC',
  mist:      '#D8D0C0',
  stone:     '#8B6B4A',
  clay:      '#C8864A',
  ink:       '#1A1208',
  sage:      '#7A9A68',
},
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: no TypeScript or Vite errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/globals.css tailwind.config.ts
git commit -m "feat: update color palette to Warm Amber scheme"
```

---

## Task 2: Badge Dark Variant

**Files:**
- Modify: `src/components/ui/Badge.tsx`

The Projects section sits on dark walnut `#3D3328`. Badges there need dark bg + amber text instead of the current light bg + clay text.

- [ ] **Step 1: Add `dark` variant to Badge**

Replace the entire file:

```tsx
interface BadgeProps {
  label: string
  variant?: 'default' | 'sage' | 'dark'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const variantClass =
    variant === 'dark'
      ? 'bg-[#4D4338] text-[#C8864A]'
      : variant === 'sage'
      ? 'bg-sage/20 text-ink'
      : 'bg-clay/10 text-[#6B5035]'

  return (
    <span
      className={`inline-block rounded px-2.5 py-0.5 text-sm font-medium ${variantClass}`}
    >
      {label}
    </span>
  )
}
```

Note: `rounded-full` → `rounded` to match the sharper aesthetic. Light badge text updated to `#6B5035` (darker than old `text-clay`).

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: clean build, no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Badge.tsx
git commit -m "feat: add dark variant to Badge component"
```

---

## Task 3: Content Types + Experience Data

**Files:**
- Modify: `src/types/content.ts`
- Modify: `src/content/experience.json`

- [ ] **Step 1: Add `techTags` to ExperienceEntry type**

In `src/types/content.ts`, update the `ExperienceEntry` interface:

```ts
export interface ExperienceEntry {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string | null
  achievements: string[]
  order: number
  companyUrl?: string
  techTags?: string[]
}
```

- [ ] **Step 2: Add techTags to experience.json**

Replace the entire file:

```json
[
  {
    "id": "foxconn",
    "company": "Foxconn Industrial Internet",
    "role": "Senior Software Engineer",
    "location": "Taipei, Taiwan",
    "startDate": "2022-07-01",
    "endDate": null,
    "achievements": [
      "Led manufacturing automation initiatives that reduced assembly cycle time by **18%** across 4 production lines",
      "Improved production yield by **4.5%** through real-time defect detection pipeline integrating computer vision",
      "Architected a telemetry ingestion service handling **50K+ sensor events/minute** with sub-100ms alerting"
    ],
    "techTags": ["Python", "OpenCV", "WebSocket", "PostgreSQL", "Linux"],
    "order": 1
  },
  {
    "id": "wistron",
    "company": "Wistron Corporation",
    "role": "Systems Engineer",
    "location": "Taipei, Taiwan",
    "startDate": "2020-08-01",
    "endDate": "2022-06-30",
    "achievements": [
      "Delivered firmware optimisations and test automation that cut product failure rate by **22%**",
      "Saved an estimated **2,000 engineering hours annually** by automating regression suites across 3 QA teams",
      "Built a CI pipeline integrating hardware-in-the-loop testing, reducing release cycle from 4 weeks to **10 days**"
    ],
    "techTags": ["Python", "pytest", "CI/CD", "Shell", "Firmware"],
    "order": 2
  }
]
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add src/types/content.ts src/content/experience.json
git commit -m "feat: add techTags field to ExperienceEntry type and data"
```

---

## Task 4: Header

**Files:**
- Modify: `src/components/layout/Header.tsx`

Two changes: bolder logo (`font-semibold` → `font-extrabold`), darker inactive nav links (`text-stone` → `text-[#5A4A38]`).

- [ ] **Step 1: Update Header**

In `src/components/layout/Header.tsx`, make two edits:

Change the logo `<a>` className from `font-semibold` to `font-extrabold`:
```tsx
<a href="#about" className="text-ink font-extrabold text-2xl">
  Shivam Maurya
</a>
```

Change inactive nav link color from `text-stone hover:text-ink` to `text-[#5A4A38] hover:text-ink` (both in desktop `<ul>` and mobile dropdown):
```tsx
// desktop
activeSection === section
  ? 'text-clay font-medium'
  : 'text-[#5A4A38] hover:text-ink transition-colors'

// mobile dropdown (onClick handler)
activeSection === section
  ? 'text-clay font-medium block'
  : 'text-[#5A4A38] hover:text-ink transition-colors block'
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: bolder header logo and darker nav link color"
```

---

## Task 5: About Section

**Files:**
- Modify: `src/components/sections/About.tsx`

Three changes: remove `min-h-screen`, remove `max-w-xs` on tagline, render `profile.bio` with left border, add skills strip at bottom.

- [ ] **Step 1: Rewrite About.tsx**

Replace the entire file:

```tsx
import { useState } from 'react'
import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'

const profile = profileData as Profile

const initials = profile.name
  .split(' ')
  .map((w: string) => w[0])
  .join('')
  .toUpperCase()
  .slice(0, 2)

const nameParts = profile.name.split(' ')

const PRIMARY_SKILLS = ['TypeScript', 'Python', 'React', 'Node.js', 'LangChain', 'PostgreSQL', 'Docker']
const SECONDARY_SKILLS = ['CI/CD', 'Computer Vision', 'WebSocket']

export function About() {
  const [photoError, setPhotoError] = useState(false)

  return (
    <section id="about" className="bg-sand">
      <div className="max-w-5xl mx-auto px-6 py-24 w-full">
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-20">

          {/* Left — photo */}
          <div className="shrink-0 md:pt-16">
            {photoError || !profile.photo ? (
              <div
                aria-label={`${profile.name} — portrait`}
                className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-mist flex items-center justify-center"
              >
                <span className="text-3xl font-bold text-clay select-none">{initials}</span>
              </div>
            ) : (
              <img
                src={`/portfolio/${profile.photo}`}
                alt={`${profile.name} — portrait`}
                width={208}
                height={208}
                fetchPriority="high"
                className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover ring-4 ring-mist"
                onError={() => setPhotoError(true)}
              />
            )}
          </div>

          {/* Right — content */}
          <div className="flex-1">
            <p className="text-stone text-base tracking-[0.2em] uppercase mb-8 font-medium">
              Full Stack Engineer · Agentic AI
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-ink leading-[1.05] mb-8">
              {nameParts.map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>

            <p className="text-[#3A2E22] text-base leading-relaxed mb-6">
              {profile.tagline}
            </p>

            {profile.bio && (
              <p className="text-[#5A4A38] text-base leading-loose mb-8 border-l-2 border-clay pl-4 max-w-lg">
                {profile.bio}
              </p>
            )}

            <nav aria-label="Social links" className="flex gap-7 text-base mb-4">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5A2B] hover:text-ink border-b border-transparent hover:border-ink/40 pb-0.5 transition-colors"
              >
                GitHub
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5A2B] hover:text-ink border-b border-transparent hover:border-ink/40 pb-0.5 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.social.email}`}
                className="text-[#8B5A2B] hover:text-ink border-b border-transparent hover:border-ink/40 pb-0.5 transition-colors"
              >
                Email
              </a>
            </nav>

            {profile.availability && (
              <p className="text-base text-sage font-medium tracking-wide mb-10">
                {profile.availability}
              </p>
            )}

            {/* Skills strip */}
            <div className="border-t border-mist pt-8">
              <p className="text-stone text-xs tracking-[0.18em] uppercase font-semibold mb-4">
                Core Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {PRIMARY_SKILLS.map(skill => (
                  <span
                    key={skill}
                    className="bg-[#3D3328] text-[#C8864A] text-sm font-medium px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {SECONDARY_SKILLS.map(skill => (
                  <span
                    key={skill}
                    className="bg-parchment text-[#6B5035] text-sm font-medium px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: render bio, add skills strip to About section"
```

---

## Task 6: Projects Section

**Files:**
- Modify: `src/components/sections/Projects.tsx`

Dark walnut background, eyebrow label, heading period removed, split summary into two lines, dark badge/button styles.

- [ ] **Step 1: Rewrite Projects.tsx**

Replace the entire file:

```tsx
import projectsData from '@/content/projects.json'
import type { Project } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

const projects = (projectsData as Project[])
  .filter(p => p.featured)
  .sort((a, b) => a.order - b.order)

function splitSummary(summary: string): [string, string | null] {
  const dot = summary.indexOf('. ')
  if (dot === -1) return [summary, null]
  return [summary.slice(0, dot + 1), summary.slice(dot + 2)]
}

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#3D3328]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-[#A89070] text-xs tracking-[0.18em] uppercase font-semibold mb-3">Work</p>
          <h2 className="text-3xl font-bold text-[#F7F3ED] mb-12">Projects</h2>
        </AnimatedSection>
        <div className="space-y-10">
          {projects.map((project, i) => {
            const [primaryLine, detailLine] = splitSummary(project.summary)
            return (
              <AnimatedSection key={project.id} delay={i * 0.08}>
                <article className="border-l-2 border-[#C8864A] pl-6 py-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-[#F7F3ED] font-semibold text-lg">{project.title}</h3>
                      <p className="text-[#C4A882] text-base leading-relaxed mt-1 max-w-xl">{primaryLine}</p>
                      {detailLine && (
                        <p className="text-[#8A7060] text-sm leading-relaxed mt-1 max-w-xl italic">{detailLine}</p>
                      )}
                    </div>
                    <div className="flex gap-3 shrink-0 sm:pt-0.5">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-[#6B5A48] text-[#C8864A] hover:bg-[#4D4338] px-4 py-2 rounded text-sm font-medium transition-colors"
                        >
                          Repo
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#C8864A] text-[#3D3328] font-semibold hover:bg-[#D49A5E] px-4 py-2 rounded text-sm transition-colors"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.techStack.map(t => (
                      <Badge key={t} label={t} variant="dark" />
                    ))}
                  </div>
                </article>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: clean build, no TS errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: dark walnut Projects section with split summaries and dark badges"
```

---

## Task 7: Experience Section + ExperienceItem

**Files:**
- Modify: `src/components/sections/Experience.tsx`
- Modify: `src/components/ui/ExperienceItem.tsx`

Add "Career" eyebrow label to the section. In ExperienceItem: amber bullet dots, render `techTags` chips below achievements.

- [ ] **Step 1: Update Experience.tsx**

Replace the entire file:

```tsx
import experienceData from '@/content/experience.json'
import type { ExperienceEntry } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ExperienceItem } from '@/components/ui/ExperienceItem'

const entries = (experienceData as ExperienceEntry[]).sort((a, b) => a.order - b.order)

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-sand">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-stone text-xs tracking-[0.18em] uppercase font-semibold mb-3">Career</p>
          <h2 className="text-3xl font-bold text-ink mb-12">Experience</h2>
        </AnimatedSection>
        <div className="space-y-12">
          {entries.map((entry, i) => (
            <AnimatedSection key={entry.id} delay={i * 0.1}>
              <ExperienceItem entry={entry} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update ExperienceItem.tsx**

Replace the entire file:

```tsx
import type { ExperienceEntry } from '@/types/content'
import { formatDate } from '@/utils/date'

interface ExperienceItemProps {
  entry: ExperienceEntry
}

export function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <article className="border-l-2 border-clay pl-6 py-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
        <div>
          <h3 className="text-ink font-semibold text-lg">{entry.company}</h3>
          <p className="text-clay font-medium">{entry.role}</p>
        </div>
        <div className="text-[#8B6B4A] text-base text-right shrink-0">
          <p>
            {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
          </p>
          <p>{entry.location}</p>
        </div>
      </div>
      <ul className="space-y-2 mb-4">
        {entry.achievements.map((ach, i) => (
          <li
            key={i}
            className="text-[#3A2E22] text-base leading-relaxed pl-4 relative"
          >
            <span className="absolute left-0 text-clay select-none">·</span>
            <span
              dangerouslySetInnerHTML={{
                __html: ach.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          </li>
        ))}
      </ul>
      {entry.techTags && entry.techTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.techTags.map(tag => (
            <span
              key={tag}
              className="bg-parchment text-[#6B5035] text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Experience.tsx src/components/ui/ExperienceItem.tsx
git commit -m "feat: Career eyebrow, amber bullet dots, tech tags on Experience"
```

---

## Task 8: Contact Section

**Files:**
- Modify: `src/components/sections/Contact.tsx`

Full replacement: dark walnut bg, two-column layout, bold editorial headline left, links + availability dot right, amber CTA email button.

- [ ] **Step 1: Rewrite Contact.tsx**

Replace the entire file:

```tsx
import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const profile = profileData as Profile

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#3D3328]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-[#A89070] text-xs tracking-[0.18em] uppercase font-semibold mb-10">
            Get in touch
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16">

            {/* Left — headline + CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#F7F3ED] leading-tight mb-5">
                Let&apos;s build<br />something<br />together.
              </h2>
              <p className="text-[#A89070] text-base leading-relaxed mb-8 max-w-sm">
                Open to full-time roles, freelance projects, or just a conversation about AI systems and engineering.
              </p>
              <a
                href={`mailto:${profile.social.email}`}
                className="inline-block bg-[#C8864A] text-[#3D3328] font-bold text-base px-6 py-3 rounded hover:bg-[#D49A5E] transition-colors"
              >
                Send an Email →
              </a>
            </div>

            {/* Right — links + availability */}
            <div className="flex flex-col justify-center">
              <a
                href={`mailto:${profile.social.email}`}
                className="flex items-center justify-between py-3 border-b border-[#4D4338] text-[#F7F3ED] hover:text-[#C8864A] transition-colors group"
              >
                <span className="text-[#8A7060] text-xs uppercase tracking-widest">Email</span>
                <span className="text-sm group-hover:underline">{profile.social.email}</span>
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 border-b border-[#4D4338] text-[#F7F3ED] hover:text-[#C8864A] transition-colors group"
              >
                <span className="text-[#8A7060] text-xs uppercase tracking-widest">GitHub</span>
                <span className="text-sm group-hover:underline">@maurya050</span>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 border-b border-[#4D4338] text-[#F7F3ED] hover:text-[#C8864A] transition-colors group"
              >
                <span className="text-[#8A7060] text-xs uppercase tracking-widest">LinkedIn</span>
                <span className="text-sm group-hover:underline">shivam-maurya</span>
              </a>
              {profile.availability && (
                <div className="flex items-center gap-2 pt-4">
                  <span className="w-2 h-2 rounded-full bg-sage inline-block" aria-hidden="true" />
                  <span className="text-sage text-sm font-medium">{profile.availability}</span>
                </div>
              )}
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: two-column Contact section with CTA and availability dot"
```

---

## Task 9: Final Visual Check

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Open `http://localhost:5173` (or the port Vite reports).

- [ ] **Step 2: Check each section visually**

Walk through top to bottom:
- Header: logo is `font-extrabold`, nav links are visibly darker than before
- About: name + tagline + bio paragraph with amber left border + skills strip with dark chips
- Projects: dark walnut background, "Work" eyebrow, no period on heading, each project has a primary line + italic detail line, dark amber badges
- Experience: "Career" eyebrow, amber `·` bullet dots, tech tag chips below each role's achievements
- Contact: dark walnut background, two-column on desktop (stacks on mobile), amber CTA button, availability dot

- [ ] **Step 3: Check mobile (375px viewport)**

In browser devtools, set viewport to 375px wide. Verify:
- About section stacks photo above text (existing behaviour, unchanged)
- Contact grid stacks to single column (headline above, links below)
- No horizontal overflow

- [ ] **Step 4: Final build**

```bash
npm run build
```

Expected: clean build with no warnings.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: final visual pass — portfolio redesign complete"
```
