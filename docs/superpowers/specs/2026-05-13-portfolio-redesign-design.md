# Portfolio Redesign — Fill & Recolor

**Date:** 2026-05-13
**Status:** Approved

## Goal

The portfolio currently feels sparse and washed out. Two problems to fix:

1. **Too much empty space** — sections have `min-h-screen` or `max-w-sm` constraints that leave most of the viewport blank. The `profile.bio` field exists in JSON but is never rendered.
2. **Colors too light** — the sand/parchment/stone palette lacks contrast and visual depth.

No new sections or routes. Touch every existing section, add no new ones.

---

## Color Palette

Replace the current flat warm-beige palette with a **Warm Amber** scheme that alternates cream and dark walnut sections.

| Token | Old | New | Usage |
|---|---|---|---|
| `sand` / `parchment` (light sections) | `#F5F0E8` / `#EDE8DC` | `#F7F3ED` / `#EDE8DC` | About, Experience backgrounds |
| dark section bg | — | `#3D3328` | Projects, Contact backgrounds |
| dark section secondary bg | — | `#4D4338` | Badge backgrounds on dark sections |
| `ink` | `#2C2416` | `#1A1208` | Primary text on light sections |
| body text (light section) | `#2C2416` (stone) | `#3A2E22` / `#4A3E32` | Body copy, descriptions |
| `clay` accent | `#8B7355` | `#C8864A` | Borders, badges, hover, amber accent |
| secondary label | `#C4B89A` (stone) | `#8B6B4A` | Eyebrow labels, meta text |
| link / interactive | `#8B7355` | `#8B5A2B` | Underlined links |
| light badge bg | `#EDE8DC` | `#EDE8DC` | Badges on light sections (unchanged) |
| light badge text | `#8B7355` | `#6B5035` | Badge text on light sections |
| dark badge text | — | `#C8864A` | Badge text on dark sections |
| `sage` (availability) | `#9CAF88` | `#7A9A68` | Slightly darker green |

**Section alternation:** About (cream) → Projects (dark walnut) → Experience (cream) → Contact (dark walnut)

The `globals.css` CSS variables and `tailwind.config.ts` color tokens need updating to match.

---

## Section Changes

### Header
- Bolder logo weight (`font-bold` → `font-extrabold`)
- Nav link secondary text darkened from `stone` to `#5A4A38`
- No structural changes

### About
- Remove `min-h-screen` — let content set height naturally
- Remove `max-w-xs` constraint on tagline paragraph
- **Render `profile.bio`** below the tagline as a new `<p>` with left amber border (`border-l-2 border-clay pl-3`)
- Add a **Skills strip** at the bottom of the section, after the availability line — separated from it by a top border:
  - Eyebrow label: "Core Skills" in uppercase tracking
  - Dark chips (`bg-[#3D3328] text-[#C8864A]`) for primary skills
  - Light chips (`bg-parchment text-[#6B5035]`) for secondary skills
  - Skills list (hardcoded, inferred from projects + experience): TypeScript, Python, React, Node.js, LangChain, PostgreSQL, Docker, CI/CD, Computer Vision, WebSocket

### Projects
- Section background: dark walnut `#3D3328`
- Add eyebrow label above h2: "Work" in uppercase tracking, color `#A89070`
- **Remove trailing period** from heading: "Projects." → "Projects"
- Section text colors flipped to light: `text-[#F7F3ED]` for headings, `text-[#C4A882]` for body
- Border-left color: `#C8864A`
- Each project entry gets a **secondary italic detail line** — the second sentence of the existing `summary` field (all five project summaries contain two natural sentences; split at the period and render the second as `<p className="italic text-sm ...">`).
- Badge backgrounds: `bg-[#4D4338] text-[#C8864A]`
- Button (ghost): `border-[#6B5A48] text-[#C8864A]`; Button (primary): `bg-[#C8864A] text-[#3D3328] font-semibold`

### Experience
- Section background stays cream (`#F7F3ED`)
- Add eyebrow label above h2: "Career"
- **Remove trailing period** from heading if present
- Achievement bullet points: replace default `li` style with amber dot marker (`·`)
- **Add tech tag chips** per role — light style (`bg-[#EDE8DC] text-[#6B5035]`), placed below the achievements list:
  - Foxconn: Python, OpenCV, WebSocket, PostgreSQL, Linux
  - Wistron: Python, pytest, CI/CD, Shell, Firmware

### Contact
- Section background: dark walnut `#3D3328`
- Add eyebrow label: "Get in touch"
- **Two-column layout** (`grid-cols-[1.2fr_1fr]`, stacks to single column on mobile):
  - **Left column:**
    - Bold editorial headline: "Let's build something together." (`text-3xl font-extrabold text-[#F7F3ED]`)
    - Subtext: "Open to full-time roles, freelance projects, or just a conversation about AI systems and engineering." (`text-[#A89070]`)
    - Amber CTA button: `<a href="mailto:...">Send an Email →</a>` — `bg-[#C8864A] text-[#3D3328] font-bold`
  - **Right column:**
    - **Remove trailing period** from heading — heading is now replaced by the two-column layout (no standalone h2 "Contact." needed; eyebrow + headline serve that role)
    - GitHub, LinkedIn, Email rows — label `text-[#8A7060]`, value `text-[#C8864A]`, border `#4D4338`
    - Availability status dot: `●` in `#7A9A68` with "Open to opportunities" text beneath the links
- Remove the old `max-w-sm` single-column layout entirely

---

## Files to Change

| File | What changes |
|---|---|
| `src/styles/globals.css` | CSS variable values updated |
| `tailwind.config.ts` | Color token hex values updated |
| `src/components/layout/Header.tsx` | Logo weight, nav text color |
| `src/components/sections/About.tsx` | Remove min-h-screen, render bio, add skills strip |
| `src/components/sections/Projects.tsx` | Dark bg, eyebrow, heading period removed, secondary detail line, badge/button styles |
| `src/components/sections/Experience.tsx` | Eyebrow label, tech tags |
| `src/components/sections/Contact.tsx` | Dark bg, heading period removed, intro sentence, max-w expanded |
| `src/components/ui/ExperienceItem.tsx` | Amber bullet dots, add techTags prop rendering |
| `src/components/ui/Badge.tsx` | Support `variant="dark"` for dark-section badges |
| `src/components/ui/Button.tsx` | Ensure primary/ghost variants work on dark backgrounds |
| `src/types/content.ts` | Add optional `techTags` field to `ExperienceEntry` |
| `src/content/experience.json` | Add `techTags` arrays to each entry |

---

## Out of Scope

- No new sections (no dedicated Skills page, no testimonials, no stats bar)
- No routing changes
- No new content files beyond `experience.json` tech tags
- No changes to Blog section (hidden when no posts)
- Resume link stays hidden until `profile.resume` is populated
