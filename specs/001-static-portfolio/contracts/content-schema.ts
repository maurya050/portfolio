/**
 * Content contracts for the Static Personal Portfolio Website
 * Source of truth for all content entities consumed by React components.
 * These interfaces mirror src/types/content.ts — keep them in sync.
 *
 * Files:
 *   src/content/profile.json       → Profile
 *   src/content/projects.json      → Project[]
 *   src/content/experience.json    → ExperienceEntry[]
 *   src/content/blog/*.md          → BlogPost (frontmatter + body)
 */

// ---------------------------------------------------------------------------
// Profile — src/content/profile.json
// ---------------------------------------------------------------------------

export interface ProfileSocial {
  github: string;    // Full URL: "https://github.com/maurya050"
  linkedin: string;  // Full URL: "https://linkedin.com/in/..."
  email: string;     // Plain email address
}

export interface Profile {
  name: string;
  title: string;          // Professional title shown in hero
  tagline: string;        // One-liner hook; MAX 120 chars
  bio: string;            // 2-4 sentence Markdown; rendered in About section
  photo: string;          // Path relative to public/: "assets/images/profile.webp"
  availability: string;   // e.g., "Open to full-time opportunities"
  social: ProfileSocial;
  resume: string;         // Path relative to public/; "" triggers fallback UI
}

// ---------------------------------------------------------------------------
// Project — src/content/projects.json (Project[])
// ---------------------------------------------------------------------------

export interface Project {
  id: string;           // Unique kebab-case slug
  title: string;
  summary: string;      // 1-3 sentence Markdown string
  techStack: string[];  // Badge labels; each MAX 20 chars
  repo?: string;        // GitHub URL; omit if private or not applicable
  demo?: string;        // Live demo URL; omit if not deployed
  featured: boolean;    // true = visible in default view (require 4-6 featured)
  order: number;        // Ascending display order; unique integers starting at 1
  thumbnail?: string;   // Path relative to public/; omit for initial-block fallback
}

// ---------------------------------------------------------------------------
// ExperienceEntry — src/content/experience.json (ExperienceEntry[])
// ---------------------------------------------------------------------------

export interface ExperienceEntry {
  id: string;              // Unique kebab-case slug: "foxconn-sde"
  company: string;
  role: string;
  location: string;
  startDate: string;       // ISO 8601: "YYYY-MM-DD"
  endDate: string | null;  // ISO 8601 or null → renders as "Present"
  achievements: string[];  // Each item: Markdown string; MIN 2 per entry
  order: number;           // Ascending display order; unique
  companyUrl?: string;     // Optional company website
}

// ---------------------------------------------------------------------------
// BlogPost — src/content/blog/<slug>.md
// ---------------------------------------------------------------------------

export interface BlogPostFrontmatter {
  title: string;
  date: string;         // ISO 8601: "YYYY-MM-DD"
  tags: string[];       // Optional; defaults to []
  excerpt: string;      // MAX 200 chars; shown in post list
  published: boolean;   // false = draft; excluded from build and sitemap
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;         // Derived from filename (without .md)
  body: string;         // HTML string from remark → remark-html pipeline
  readingTime: number;  // Estimated minutes; Math.ceil(wordCount / 200)
}

// ---------------------------------------------------------------------------
// ContactForm — runtime only; submitted to Formspree
// ---------------------------------------------------------------------------

export interface ContactFormData {
  name: string;     // MIN 2 chars, MAX 100 chars
  email: string;    // Valid RFC 5322 email
  message: string;  // MIN 10 chars, MAX 2000 chars
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormState {
  status: ContactFormStatus;
  errorMessage?: string;
}
