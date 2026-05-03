<!--
SYNC IMPACT REPORT
==================
Version change: (none — initial constitution, 0.0.0) → 1.0.0
Bump type: MAJOR — first complete ratification, all placeholders filled.

Modified principles: N/A (initial fill from template)

Added sections:
  - I. Radical Simplicity (was PRINCIPLE_1)
  - II. Japanese Minimalist Aesthetic (was PRINCIPLE_2)
  - III. Performance First (was PRINCIPLE_3)
  - IV. Accessibility & Responsiveness (was PRINCIPLE_4)
  - V. Markdown-Driven Content (was PRINCIPLE_5)
  - Technology & Stack Constraints (was SECTION_2)
  - Quality Gates (was SECTION_3)

Removed sections: None

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check section
     is generic (`[Gates determined based on constitution file]`);
     no hardcoded conflicts. No edit required.
  ✅ .specify/templates/spec-template.md — No direct principle
     references; compatible as-is.
  ✅ .specify/templates/tasks-template.md — Example tasks are
     illustrative and labelled optional; no conflicts.
  ✅ .specify/templates/checklist-template.md — Fully generic;
     no conflicts.

Deferred TODOs: None — all placeholders resolved.
-->

# Personal Portfolio Constitution

## Core Principles

### I. Radical Simplicity

Every element on every page MUST earn its place. If removing it does not break
clarity or function, remove it. Visual noise, redundant copy, decorative-only
components, and "just in case" features are PROHIBITED.

- Layouts MUST use generous negative space (Ma) as a primary design element.
- Color palette MUST be restricted to warm/earthy neutrals plus at most one
  muted accent; no bright or high-saturation colors.
- Typography hierarchy MUST be calm and linear — one primary typeface,
  no more than three weight/size variants per page.
- Clutter is a defect. Treat it as one.

### II. Japanese Minimalist Aesthetic

The visual language of the portfolio MUST reflect wabi-sabi and Ma: imperfect
simplicity, deliberate emptiness, and understated elegance.

- Warm and earthy tones (sand, stone, clay, muted sage) MUST define the
  color system; cool grays or stark white are secondary or absent.
- Transitions and interactions MUST be subtle and purposeful — no entrance
  animations that delay content, no parallax for decoration alone.
- Every page MUST feel calm to look at before the visitor reads a word.
- No loaders, spinners, or skeleton screens unless network latency genuinely
  requires them.

### III. Performance First

Fast loading is a hard non-negotiable, not a stretch goal.

- Total page load (LCP) MUST be under 2 seconds on a mid-range device on
  a 4G connection, as measured by Lighthouse or WebPageTest.
- All images MUST be served in modern formats (WebP/AVIF) with explicit
  width/height attributes to prevent layout shift (CLS < 0.1).
- JavaScript payload MUST be minimal; interactive enhancements MUST be
  progressively added, never blocking render.
- No analytics, tracking scripts, or third-party embeds that add more than
  50 ms to Time to Interactive without explicit justification.
- Heavy CSS animations (canvas, complex SVG paths, WebGL) are PROHIBITED.

### IV. Accessibility & Responsiveness

The portfolio MUST be usable and legible by every visitor on every device.

- All interactive elements MUST meet WCAG 2.1 AA contrast ratios (4.5:1
  for normal text, 3:1 for large text and UI components).
- Keyboard navigation MUST reach every interactive element in logical order.
- All images MUST have descriptive `alt` text; decorative images MUST use
  `alt=""`.
- Layouts MUST be fluid and tested at 320 px, 768 px, 1024 px, and 1440 px
  breakpoints with no horizontal scroll at any viewport.
- ARIA roles MUST be used only where semantic HTML is insufficient; no
  ARIA theater on elements that already carry correct semantics.

### V. Markdown-Driven Content

All prose content (bio, project descriptions, blog posts, case studies) MUST
live in Markdown files, not hardcoded in templates or components.

- Adding or editing content MUST NOT require touching component code.
- Markdown files MUST be the single source of truth; templates render them,
  never duplicate them.
- Frontmatter (YAML/TOML) MUST be used for structured metadata (title, date,
  tags, thumbnail); no metadata hardcoded in layout files.
- Content and presentation MUST remain independently deployable — a content
  update requires no rebuild of design tokens or component logic.

## Technology & Stack Constraints

These constraints keep the project lightweight, maintainable, and aligned with
the principles above. Deviations MUST be justified in plan.md under Complexity
Tracking before implementation.

- **Static-first**: The site MUST be statically generated (SSG) or pre-rendered;
  no server-rendered pages unless a feature provably requires dynamic data.
- **Dependency hygiene**: Add a dependency only when it would take more than a
  day to implement the equivalent correctly from scratch. Each new dependency
  requires a documented rationale.
- **No CSS frameworks by default**: Utility or component frameworks (Bootstrap,
  Tailwind, Material UI) are permitted only if the project complexity clearly
  outgrows hand-crafted styles. Decision MUST be documented.
- **Font loading**: Web fonts MUST use `font-display: swap` and be subset to the
  characters actually used; system font stacks are preferred for body text.
- **Zero runtime trackers**: No Google Analytics, Meta Pixel, or equivalent
  without explicit user consent infrastructure in place.

## Quality Gates

Every feature or content change MUST pass these gates before merge.

- **Lighthouse CI**: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90,
  SEO ≥ 90 on a production build.
- **WCAG contrast check**: All new color combinations verified with a tool
  (axe, Colour Contrast Analyser) before code review.
- **Responsive smoke test**: Manually verified at 320 px and 1440 px in both
  light mode and (if supported) dark mode.
- **Content edit test**: Any new content block validated by editing only the
  Markdown source — no component changes required.
- **No new heavy dependencies**: Any npm/pip/gem package added triggers a
  bundle-size diff review.

## Governance

This constitution is the highest authority for all design, engineering, and
content decisions on the portfolio. When a plan, PR, or design conflicts with
these principles, the constitution wins — or an amendment is filed first.

**Amendment procedure**:
1. Propose the change in writing, stating the principle being modified and why.
2. Increment `CONSTITUTION_VERSION` following semver rules defined in the
   Spec Kit governance policy.
3. Update `LAST_AMENDED_DATE` to the amendment date.
4. Propagate changes to templates per the Sync Impact Report format above.

**Compliance review**: Every implementation plan's "Constitution Check" section
MUST map each principle to a pass/fail/N-A verdict. Violations that are
genuinely unavoidable MUST be logged in plan.md under Complexity Tracking with
a stated simpler alternative that was rejected and why.

**Simplicity is not negotiable**: Complexity MUST always be justified. The
default answer to "should we add this?" is no.

**Version**: 1.0.0 | **Ratified**: 2026-05-01 | **Last Amended**: 2026-05-01
