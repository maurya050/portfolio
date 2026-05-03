Minimal static personal portfolio

Quick start

1. Open `index.html` in a browser (mobile-first design).
2. Replace `assets/profile.jpg` and `assets/resume.pdf` with your real files.
3. Update `projects.json` with titles, summaries, tech, repo and demo links.
4. Add blog posts in `posts/` and add entries to `posts/index.json`.

Development

- Serve locally (recommended):

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

Customization notes

- `script.js` provides simple loaders for `projects.json` and `posts/index.json`.
- Contact form uses `mailto:` by default. Replace `contactSubmit` in `script.js` to integrate any service.

Deployment

- This is a static site; deploy to GitHub Pages, Netlify or Vercel.

Design

- Palette: warm neutrals, spacious layout, minimal typography.

Files created

- index.html, styles.css, script.js, projects.json, posts/, README.md

If you'd like, I can:
- convert this into a React/Vite project
- add a simple build/deploy GitHub Action
- generate a printable `resume.pdf` from a `resume.md` file
