import { Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Education } from '@/components/sections/Education'
import { Contact } from '@/components/sections/Contact'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'

const profile = profileData as Profile

const PAGE_TITLES: Record<string, string> = {
  '/': `${profile.name} — Portfolio`,
  '/projects': `Projects — ${profile.name}`,
  '/experience': `Experience — ${profile.name}`,
  '/education': `Education — ${profile.name}`,
  '/contact': `Contact — ${profile.name}`,
}

function App() {
  const location = useLocation()
  const posts = useBlogPosts()
  const showBlogNav = posts.length > 0
  const title = PAGE_TITLES[location.pathname] ?? `${profile.name} — Portfolio`

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={profile.tagline} />
      </Helmet>
      <Layout showBlogNav={showBlogNav}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HelmetProvider>
  )
}

export default App
