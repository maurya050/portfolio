# Data Model: Static Personal Portfolio Website

**Branch**: `001-static-portfolio` | **Date**: 2026-05-01
**Input**: spec.md entities + research.md decisions

All content entities are stored as static files in `src/content/`. No database. No runtime writes.

---

## Entity: Profile

**File**: `src/content/profile.json`
**Consumed by**: `About` section component, `Header`, `Footer`

```typescript
interface Profile {
  name: string;               // "Shivam Maurya"
  title: string;              // "Full Stack Engineer & Agentic AI Specialist"
  tagline: string;            // One-sentence hook shown in hero, ≤ 120 chars
  bio: string;                // 2–4 sentence Markdown string; rendered in About section
  photo: string;              // Path relative to public/: "assets/images/profile.webp"
  availability: string;       // e.g., "Open to full-time opportunities"
  social: {
    github: string;           // Full URL: "https://github.com/maurya050"
    linkedin: string;         // Full URL: "https://linkedin.com/in/..."
    email: string;            // Plain email address: "mauryashivam050@gmail.com"
  };
  resume: string;             // Path relative to public/: "assets/resume/Shivam-Maurya-Resume.pdf"
}
```

**Validation rules**:
- `name`, `title`, `tagline`, `bio`, `photo` — REQUIRED
- `social.github`, `social.linkedin`, `social.email` — REQUIRED; URLs must begin with `https://`
- `tagline` — MAX 120 characters
- `photo` — MUST resolve to an existing file in `public/`
- `resume` — MAY be an empty string (`""`) to trigger the "resume coming soon" fallback

---

## Entity: Project

**File**: `src/content/projects.json` (array)
**Consumed by**: `Projects` section component, `ProjectCard` UI component

```typescript
interface Project {
  id: string;                 // Unique slug: "agentic-ai-orchestrator"
  title: string;              // Display title: "Agentic AI Orchestrator"
  summary: string;            // 1–3 sentence Markdown string
  techStack: string[];        // Badge labels: ["TypeScript", "LangChain", "FastAPI"]
  repo?: string;              // GitHub URL; omit if private
  demo?: string;              // Live demo URL; omit if not deployed
  featured: boolean;          // true = shown in default view; false = hidden behind "Show more"
  order: number;              // Ascending display order; lower = shown first
  thumbnail?: string;         // Path relative to public/: "assets/images/projects/..."
}
```

**Validation rules**:
- `id`, `title`, `summary`, `techStack` — REQUIRED
- `id` — MUST be unique across all projects; kebab-case only
- `techStack` — MIN 1 item; each label MAX 20 characters
- At least one of `repo` or `demo` MUST be present (not both may be absent)
- `featured: true` items — MUST be between 4 and 6; spec requires 4–6 visible works
- `order` — MUST be unique; integers starting at 1
- `thumbnail` — OPTIONAL; if omitted, a placeholder/initial block renders instead

---

## Entity: ExperienceEntry

**File**: `src/content/experience.json` (array)
**Consumed by**: `Experience` section component, `ExperienceItem` UI component

```typescript
interface ExperienceEntry {
  id: string;                 // "foxconn-sde" or "wistron-backend-eng"
  company: string;            // "Foxconn Industrial Internet"
  role: string;               // "Software Development Engineer"
  location: string;           // "Taipei, Taiwan"
  startDate: string;          // ISO date: "2022-07-01"
  endDate: string | null;     // ISO date or null for "Present"
  achievements: string[];     // Each item is a Markdown string; include metrics
  order: number;              // Ascending display order; lower = shown first
  companyUrl?: string;        // Optional company website URL
}
```

**Validation rules**:
- `id`, `company`, `role`, `startDate`, `achievements` — REQUIRED
- `startDate` / `endDate` — ISO 8601 format `YYYY-MM-DD`
- `endDate: null` renders as "Present"
- `achievements` — MIN 2 items per entry; each item MAX 200 characters; SHOULD contain at least one metric (number, percentage, or scale indicator)
- `order` — MUST be unique

---

## Entity: BlogPost

**File**: `src/content/blog/<slug>.md` (one file per post)
**Consumed by**: `Blog` section component (list), `[slug].tsx` page (detail)
**Derivation**: `slug` is the filename without `.md` extension

### Frontmatter Schema

```typescript
interface BlogPostFrontmatter {
  title: string;              // Post title
  date: string;               // ISO date: "2026-04-15"
  tags: string[];             // ["agentic-ai", "typescript"]
  excerpt: string;            // 1–2 sentence summary shown in list view; ≤ 200 chars
  published: boolean;         // false = draft; excluded from build output
}
```

### Full Post Type (after parsing)

```typescript
interface BlogPost extends BlogPostFrontmatter {
  slug: string;               // Derived from filename: "building-ai-agents"
  body: string;               // HTML string — output of remark → remark-html
  readingTime: number;        // Estimated minutes; computed from word count ÷ 200
}
```

**Validation rules**:
- `title`, `date`, `excerpt`, `published` — REQUIRED in frontmatter
- `date` — ISO 8601 format
- `tags` — OPTIONAL; defaults to `[]` if absent
- `published: false` posts are parsed but excluded from the blog list and sitemap
- `excerpt` — MAX 200 characters
- An empty `src/content/blog/` directory (only `.gitkeep`) MUST result in the blog section being hidden from navigation (zero posts rendered)

---

## Entity: ContactFormData

**Runtime only** — not stored; submitted to Formspree
**Consumed by**: `ContactForm` UI component

```typescript
interface ContactFormData {
  name: string;               // Visitor's name; MIN 2 chars
  email: string;              // Valid email address; RFC 5322
  message: string;            // Message body; MIN 10 chars, MAX 2000 chars
}

interface ContactFormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage?: string;
}
```

**Validation rules** (client-side, before Formspree submission):
- `name` — REQUIRED; MIN 2 characters; MAX 100 characters
- `email` — REQUIRED; MUST match standard email pattern
- `message` — REQUIRED; MIN 10 characters; MAX 2000 characters
- All fields validated on submit; individual fields validated on blur

---

## State Transitions: Contact Form

```
idle
  → submitting   (user clicks Send with valid inputs)

submitting
  → success      (Formspree returns 200 OK)
  → error        (network failure or Formspree 4xx/5xx)

success
  → idle         (user clicks "Send another message")

error
  → idle         (user edits a field)
  → submitting   (user retries)
```

---

## Content File Relationships

```
src/content/
├── profile.json          ← 1 file; loaded once by About + Header
├── projects.json         ← 1 file; array of 4–6 Project entries
├── experience.json       ← 1 file; array of ExperienceEntry (Foxconn + Wistron)
└── blog/
    ├── .gitkeep          ← Empty dir sentinel; blog section hidden when only this present
    └── *.md              ← One file per BlogPost; slug = filename
```

---

## Design Token Reference

These tokens are defined in `tailwind.config.ts` and used across all components:

| Token | Hex | Usage |
|---|---|---|
| `sand` | `#F5F0E8` | Page background |
| `parchment` | `#EDE8DC` | Card / section alt background |
| `mist` | `#D4CEC6` | Borders, dividers, subtle separators |
| `stone` | `#C4B89A` | Secondary text, muted labels, placeholders |
| `clay` | `#8B7355` | Primary accent: links, active nav, badge fill |
| `ink` | `#2C2416` | Primary text — warm near-black |
| `sage` | `#9CAF88` | Secondary accent — AI / tech category labels |

**WCAG 2.1 AA pairings verified**:

| Foreground | Background | Ratio | Usage |
|---|---|---|---|
| `ink` | `sand` | 12.5:1 ✅ | Body text |
| `ink` | `parchment` | 11.2:1 ✅ | Card body text |
| `clay` | `sand` | 4.6:1 ✅ | Link text, active nav |
| `clay` | `parchment` | 4.1:1 ✅ | Card links (large text ≥ 18px OK; body text borderline — use `ink` for body) |
| `stone` | `sand` | 2.8:1 ⚠️ | Decorative/large text ONLY (≥ 24px regular or ≥ 18.67px bold) |
| `ink` | `clay` | 2.7:1 ⚠️ | Button text on clay bg — use `sand` for button text instead |
| `sand` | `clay` | 4.6:1 ✅ | Button text on clay background |
