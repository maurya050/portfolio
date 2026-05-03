# Feature Specification: Static Personal Portfolio Website

**Feature Branch**: `001-static-portfolio`
**Created**: 2026-05-01
**Status**: Draft
**Input**: User description: "Build a static personal portfolio website for a Full Stack Engineer with Agentic AI skill. Sections: Home/About, Projects, Experience, (Optional Blog), and Contact/Resume. Show profile intro, photo, social links (GitHub / LinkedIn / Email). Projects list 4–6 works with title, summary, tech stack badges, and repo/demo links. Experience highlights Foxconn & Wistron achievements with metrics. Optional blog supports markdown posts; contact links to downloadable resume + email form. Focus: Japanese minimalism, warm neutral palette, mobile-first layout, professional tone. Out of scope: comment systems, login, database, or third-party analytics beyond basic tracking."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First Impression & Professional Identity (Priority: P1)

A recruiter or hiring manager lands on the portfolio for the first time. They want to immediately understand who Shivam is, what makes him distinctive (Full Stack + Agentic AI expertise), and how to reach him — all within the first few seconds of the visit.

**Why this priority**: The Home/About section is the entry point for every visitor. If it fails to communicate identity and value clearly, all other sections become less effective. This is the highest-return section for a portfolio.

**Independent Test**: Deploy the Home/About section alone. A test user with no prior knowledge of Shivam should be able to state his specialty, read his bio, and find his GitHub, LinkedIn, and email links — all without scrolling more than once on mobile.

**Acceptance Scenarios**:

1. **Given** a visitor arrives at the portfolio URL, **When** the page finishes loading, **Then** they see a profile photo, Shivam's name, his professional title, and a brief bio above the fold on both mobile and desktop.
2. **Given** the Home section is visible, **When** the visitor looks for contact options, **Then** they can find and click working links to GitHub, LinkedIn, and email without any dead links.
3. **Given** a visitor using a screen reader, **When** they navigate the Home section, **Then** all elements — including the profile photo — have descriptive text and the navigation order is logical.

---

### User Story 2 - Projects Portfolio Browsing (Priority: P2)

A technical evaluator (engineer, tech lead, or CTO) wants to assess Shivam's technical depth and range. They browse the Projects section to review 4–6 featured works, looking at what was built, which technologies were used, and whether they can explore the code or see a live demo.

**Why this priority**: Projects are the primary evidence of technical capability. Without them, the portfolio is a résumé. This section directly converts interest into confidence.

**Independent Test**: The Projects section can be rendered and browsed in isolation. A technical evaluator can read all project cards, see tech stack badges, and click through to at least one GitHub repository and one live demo without any other section being present.

**Acceptance Scenarios**:

1. **Given** the Projects section is loaded, **When** the visitor scans the page, **Then** they see between 4 and 6 project cards, each showing a title, a summary paragraph, and a set of tech stack badges.
2. **Given** a project has a repository link, **When** the visitor clicks it, **Then** they are taken to the correct external URL in a new tab.
3. **Given** a project has a demo link, **When** the visitor clicks it, **Then** they are taken to the live demo in a new tab; if no demo exists, no broken link or empty button is shown.
4. **Given** a visitor on a 320px-wide mobile screen, **When** they view the Projects section, **Then** all project cards are fully readable with no content clipped or hidden by overflow.

---

### User Story 3 - Experience & Achievements Review (Priority: P3)

An HR professional or technical interviewer wants to verify Shivam's professional background. They read the Experience section to confirm employment at Foxconn and Wistron, understand his roles, and review specific measurable achievements.

**Why this priority**: Experience establishes credibility and seniority. Metrics-driven achievements differentiate Shivam from candidates with identical job titles. This section directly supports hiring decisions.

**Independent Test**: The Experience section can be rendered standalone. A reviewer with no other context can identify company names, role titles, date ranges, and at least one quantified achievement per role.

**Acceptance Scenarios**:

1. **Given** the Experience section is loaded, **When** the visitor reads it, **Then** they see entries for Foxconn and Wistron, each with a job title, employment dates, and bullet-point achievements that include at least one measurable metric (e.g., percentage improvement, team size, system scale).
2. **Given** a visitor views the Experience section on mobile, **When** they scroll through it, **Then** all entries are fully readable and no text is truncated.

---

### User Story 4 - Contact & Resume Download (Priority: P4)

A recruiter who has decided Shivam is a strong candidate wants to reach out directly or pass his résumé to a hiring committee. They need to download a PDF résumé and/or send a message without creating any account or navigating away from the site.

**Why this priority**: The contact section is the conversion point. A broken or friction-heavy contact experience directly reduces the recruiter-to-interview rate.

**Independent Test**: The Contact section can be used in isolation. A test user can download the résumé PDF and submit a contact form message; the submission succeeds and the user receives a visual confirmation.

**Acceptance Scenarios**:

1. **Given** the Contact section is loaded, **When** the visitor clicks the résumé download link, **Then** the browser downloads or opens a PDF file named clearly (e.g., `Shivam-Maurya-Resume.pdf`) without requiring a login or redirect.
2. **Given** the visitor fills in their name, email, and message and clicks Send, **When** the form is submitted with valid inputs, **Then** the visitor sees a success confirmation and the message is delivered to Shivam's inbox via a third-party form service.
3. **Given** the visitor submits the form with a missing required field, **When** submission is attempted, **Then** the specific missing field is highlighted with an accessible error message and the form is not submitted.
4. **Given** the third-party form service is temporarily unavailable, **When** the visitor cannot submit the form, **Then** a direct email link and LinkedIn URL remain visible so the visitor can still reach Shivam.

---

### User Story 5 - Blog Post Reading (Priority: P5 — Optional)

A developer or potential collaborator interested in Shivam's thinking finds the Blog section and reads a technical post. Blog posts are authored in Markdown and the section is hidden gracefully when no posts exist.

**Why this priority**: The blog reinforces thought leadership but does not block the core portfolio use cases. It is valuable-but-deferrable and can ship empty in v1.

**Independent Test**: With at least one Markdown post file present, the Blog section shows a post list. Clicking a post displays its full content. With zero post files, the section is either hidden from the navigation or shows a "Coming soon" placeholder — no broken pages or empty lists.

**Acceptance Scenarios**:

1. **Given** at least one Markdown post file exists, **When** the visitor navigates to the Blog section, **Then** they see a list of posts showing the title, publication date, and a brief excerpt or tag.
2. **Given** a post list is displayed, **When** the visitor clicks a post title, **Then** the full post content renders correctly including headings, code blocks, and inline formatting.
3. **Given** no Markdown post files exist, **When** the visitor navigates to the Blog section (if linked), **Then** they see a graceful placeholder message rather than an empty or broken page.

---

### Edge Cases

- What if the contact form service is unavailable? The contact section MUST still display a direct email link and LinkedIn URL as permanent fallbacks.
- What if a project entry has no demo URL? The demo button/link MUST be absent rather than broken; the layout MUST accommodate cards with repo-only links.
- What if no blog posts exist at deploy time? The blog navigation link and section MUST be hidden or show a "coming soon" state — no empty list rendered.
- What if the résumé PDF has not yet been uploaded? The download link area MUST show a placeholder message directing visitors to email instead.
- What if the profile photo fails to load? A styled fallback (initials or icon) MUST display in place of the broken image.
- What if a visitor uses a screen with fewer than 320px of width? The layout degrades gracefully — no content loss, though pixel-perfection is not required below 320px.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST display a Home/About section presenting the owner's profile photo, full name, professional title, a brief bio (2–4 sentences), and working links to GitHub, LinkedIn, and email.
- **FR-002**: The site MUST display a Projects section with 4–6 project cards, each containing a title, a summary paragraph, one or more tech stack badges, and at least one external link (repository or live demo).
- **FR-003**: The site MUST display an Experience section with one entry per employer (Foxconn and Wistron), each entry containing the job title, employment date range, and achievement bullets that include at least one quantified metric per bullet where applicable.
- **FR-004**: The site MUST display a Contact section containing a downloadable résumé link (PDF), a contact form (name, email, message fields), and direct links to email and LinkedIn as fallbacks.
- **FR-005**: All prose content — bio, project descriptions, experience entries, and blog posts — MUST be stored in Markdown files; updating or adding content MUST NOT require changes to layout, component, or configuration code.
- **FR-006**: The site MUST be fully responsive with no horizontal scrolling at 320px, 768px, 1024px, and 1440px viewport widths.
- **FR-007**: All interactive elements MUST meet WCAG 2.1 AA contrast standards; all images MUST carry descriptive alt text; keyboard navigation MUST reach every interactive element in logical order.
- **FR-008**: The site's primary content MUST be visible and usable within 2 seconds on a mid-range mobile device on a 4G connection (measured by Largest Contentful Paint).
- **FR-009**: The contact form MUST deliver submissions to Shivam's email via a third-party form service; no custom backend server is required.
- **FR-010**: (Optional) The site SHOULD support a Blog section; when no posts exist the section MUST be hidden from navigation or display a graceful placeholder — it MUST NOT show an empty list or broken page.
- **FR-011**: The site MUST NOT include user authentication, server-side databases, comment systems, or heavy third-party analytics scripts; a single lightweight privacy-respecting analytics snippet is permitted.
- **FR-012**: Navigation MUST allow visitors to jump to any section (Home, Projects, Experience, Contact, and optionally Blog) from any page position without a full page reload.

### Key Entities

- **Profile**: Name, professional title, bio text (Markdown), profile photo, social links (GitHub URL, LinkedIn URL, email address).
- **Project**: Title, summary (Markdown), tech stack list (array of badge labels), repository URL, demo URL (optional), display order.
- **Experience Entry**: Employer name, role title, start date, end date (or "Present"), achievement bullets (each as Markdown text with optional metrics).
- **Resume**: A static PDF file with a version date embedded in the filename for cache-busting.
- **Blog Post** (optional): Title, publication date, tags (array), body content (Markdown file), URL slug derived from filename.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor with no prior knowledge of Shivam can identify his specialty, navigate to any major section, and locate his contact options within 10 seconds of the page loading.
- **SC-002**: The site achieves Lighthouse scores of ≥ 90 Performance, ≥ 95 Accessibility, ≥ 90 Best Practices, and ≥ 90 SEO on a production build.
- **SC-003**: A recruiter can download the résumé and submit a contact message end-to-end in under 2 minutes without creating an account or navigating away from the portfolio.
- **SC-004**: The site's Largest Contentful Paint (LCP) is under 2 seconds and Cumulative Layout Shift (CLS) is below 0.1 as measured on a mid-range mobile device.
- **SC-005**: A content update — adding a new project, editing the bio, or publishing a blog post — requires editing only Markdown files; zero changes to layout, component, or configuration code are needed.
- **SC-006**: The site renders without horizontal scroll or clipped content at 320px, 768px, 1024px, and 1440px viewport widths in both portrait and landscape orientations.
- **SC-007**: All new color combinations used in the warm neutral palette meet WCAG 2.1 AA contrast ratios (4.5:1 for body text, 3:1 for UI components and large text).

---

## Assumptions

- All portfolio content (bio, project descriptions, experience achievements with metrics, resume PDF) will be provided by Shivam as source material before or during development.
- Social profile URLs (GitHub, LinkedIn) and a working contact email address will be supplied before deployment.
- The résumé is a pre-existing PDF document ready for static file hosting; the file will be updated out-of-band without requiring code changes.
- Contact form submissions will be routed through a free-tier third-party form service (Formspree or equivalent); no custom backend server is in scope.
- The site will be deployed to a static hosting platform (Netlify, Vercel, or GitHub Pages) that serves static assets and supports redirect rules.
- The blog section ships in v1 but may be empty (hidden); no posts are required at launch.
- A single lightweight privacy-respecting analytics script (e.g., Plausible, Fathom, or Umami) is acceptable per the "basic tracking" clause in the brief; it is optional and may be omitted entirely.
- The profile photo is a high-resolution portrait provided by Shivam; it will be optimised to WebP/AVIF format during build.
- The warm neutral palette (sand, stone, clay, muted sage) defined in the project constitution governs all color decisions; no new palette will be designed during specification.
- "Agentic AI" as a skill area will be represented in the bio and in relevant project entries — no separate standalone section is needed.
