# Quickstart: Static Personal Portfolio Website

**Branch**: `001-static-portfolio` | **Date**: 2026-05-01

---

## Prerequisites

- Node.js ≥ 20.0.0 (LTS recommended)
- npm ≥ 9.0.0 (ships with Node 20)
- Git

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your Formspree form ID:

```bash
VITE_FORMSPREE_ID=your_formspree_form_id
VITE_BASE_URL=http://localhost:5173
```

Get a free Formspree form ID at https://formspree.io — create a new form and copy the ID from the endpoint URL.

### 3. Start the development server

```bash
npm run dev
```

Opens at `http://localhost:5173`. Hot module replacement (HMR) is enabled — edits to components and content files reflect instantly.

---

## Content Editing

All content lives in `src/content/`. No component code changes required.

### Update your profile bio

Edit `src/content/profile.json`:

```json
{
  "name": "Shivam Maurya",
  "title": "Full Stack Engineer & Agentic AI Specialist",
  "tagline": "I build production-grade AI systems and the interfaces that make them accessible.",
  "bio": "Your 2–4 sentence Markdown bio here.",
  "photo": "assets/images/profile.webp",
  "availability": "Open to full-time opportunities",
  "social": {
    "github": "https://github.com/maurya050",
    "linkedin": "https://linkedin.com/in/your-profile",
    "email": "mauryashivam050@gmail.com"
  },
  "resume": "assets/resume/Shivam-Maurya-Resume.pdf"
}
```

### Add a project

Append an entry to `src/content/projects.json`:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "summary": "A one-to-three sentence description of what you built and why it matters.",
  "techStack": ["TypeScript", "FastAPI", "LangChain"],
  "repo": "https://github.com/maurya050/my-new-project",
  "demo": "https://my-project.vercel.app",
  "featured": true,
  "order": 5
}
```

Set `"featured": true` to show in the default view. Ensure `featured: true` count stays between 4 and 6.

### Update work experience

Edit entries in `src/content/experience.json`. Each achievement bullet supports Markdown:

```json
{
  "id": "foxconn-sde",
  "company": "Foxconn Industrial Internet",
  "role": "Software Development Engineer",
  "location": "Taipei, Taiwan",
  "startDate": "2022-07-01",
  "endDate": null,
  "achievements": [
    "Reduced API response latency by **40%** through connection pool optimisation across 12 microservices",
    "Led migration of 3 legacy services to containerised architecture serving **1M+ daily requests**"
  ],
  "order": 1
}
```

### Publish a blog post

Create a new file in `src/content/blog/`:

```bash
touch src/content/blog/my-first-post.md
```

```markdown
---
title: "Building an Agentic AI Orchestrator"
date: "2026-04-20"
tags: ["agentic-ai", "typescript", "langchain"]
excerpt: "How I designed a multi-agent coordination system for production workflows."
published: true
---

Your post content here. Full GitHub Flavored Markdown supported.

## Headings

Code blocks, **bold**, _italic_, and `inline code` all render correctly.
```

Set `published: false` to save as a draft without it appearing on the site.

### Upload your résumé

Replace `public/assets/resume/Shivam-Maurya-Resume.pdf` with your updated PDF. The filename controls the download name visible to recruiters — keep it professional.

### Replace profile photo

Replace `public/assets/images/profile.webp` with a high-resolution portrait. The build process does not auto-convert formats — prepare the WebP file locally:

```bash
# Using cwebp (install via Homebrew: brew install webp)
cwebp -q 85 your-photo.jpg -o public/assets/images/profile.webp
```

Recommended: 400×400 px, < 100 KB, WebP format.

---

## Build & Preview

### Production build

```bash
npm run build
```

Output is in `dist/`. vite-ssg pre-renders each route to a static HTML file.

### Preview the production build locally

```bash
npm run preview
```

Opens at `http://localhost:4173`. Use this to validate the production build before deploying.

---

## Testing

### Unit tests

```bash
npm run test
```

### Unit tests (watch mode)

```bash
npm run test:watch
```

### E2E tests (requires production build)

```bash
npm run build && npm run test:e2e
```

### Lighthouse audit (requires production build)

```bash
npm run build && npm run lighthouse
```

Checks Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90.

---

## Deployment

### GitHub Pages (automated via CI/CD)

Push to `main` — the GitHub Actions workflow builds and deploys automatically:

```bash
git push origin main
```

The workflow:
1. Installs dependencies
2. Runs unit tests
3. Builds with `npm run build`
4. Publishes `dist/` to the `gh-pages` branch
5. Runs Lighthouse CI audit on the deployed URL

### First-time GitHub Pages setup

1. Go to your repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `gh-pages` branch, `/ (root)` folder
4. Add `VITE_FORMSPREE_ID` to repository Settings → Secrets → Actions

### Custom domain

1. Add a `CNAME` file to `public/` containing your domain name: `portfolio.shivammaurya.dev`
2. Configure your DNS provider to point to GitHub Pages
3. Update `VITE_BASE_URL` in your GitHub Actions env to the custom domain

---

## Project Structure Quick Reference

```
src/content/          ← Edit here for all content changes
  profile.json        ← Bio, photo, social links
  projects.json       ← Project cards
  experience.json     ← Work history
  blog/*.md           ← Blog posts (add to enable blog section)

public/assets/        ← Binary assets (images, PDF)
  images/profile.webp ← Profile photo
  resume/*.pdf        ← Downloadable résumé

src/components/       ← React components (no content hardcoded here)
src/styles/           ← Tailwind directives + CSS custom properties
.github/workflows/    ← CI/CD pipeline
```
