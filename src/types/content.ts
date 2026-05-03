export interface ProfileSocial {
  github: string
  linkedin: string
  email: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  bio: string
  photo: string
  availability: string
  social: ProfileSocial
  resume: string
}

export interface Project {
  id: string
  title: string
  summary: string
  techStack: string[]
  repo?: string
  demo?: string
  featured: boolean
  order: number
  thumbnail?: string
}

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
}

export interface BlogPostFrontmatter {
  title: string
  date: string
  tags: string[]
  excerpt: string
  published: boolean
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string
  body: string
  readingTime: number
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface ContactFormState {
  status: ContactFormStatus
  errorMessage?: string
}
