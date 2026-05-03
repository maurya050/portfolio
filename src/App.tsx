import { useState, useEffect } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Blog } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/Contact'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'

const profile = profileData as Profile

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const posts = useBlogPosts()
  const showBlogNav = posts.length > 0

  useEffect(() => {
    const sections = ['about', 'projects', 'experience', 'blog', 'contact']
    const observers: IntersectionObserver[] = []

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [showBlogNav])

  return (
    <HelmetProvider>
      <Helmet>
        <title>{profile.name} — Portfolio</title>
        <meta name="description" content={`${profile.tagline}`} />
      </Helmet>
      <Layout activeSection={activeSection} showBlogNav={showBlogNav}>
        <About />
        <Projects />
        <Experience />
        {showBlogNav && <Blog />}
        <Contact />
      </Layout>
    </HelmetProvider>
  )
}

export default App
