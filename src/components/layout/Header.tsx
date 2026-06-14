import { useState } from 'react'

interface HeaderProps {
  activeSection: string
  showBlogNav: boolean
}

const NAV_SECTIONS = ['about', 'projects', 'experience', 'education', 'contact'] as const
const LABELS: Record<string, string> = {
  about: 'About',
  projects: 'Projects',
  experience: 'Experience',
  education: 'Education',
  contact: 'Contact',
  blog: 'Writing',
}

export function Header({ activeSection, showBlogNav }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const sections = showBlogNav
    ? [...NAV_SECTIONS.slice(0, 4), 'blog', NAV_SECTIONS[4]]
    : [...NAV_SECTIONS]

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur border-b border-[#1E293B]">
      <nav
        aria-label="Main navigation"
        className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <a href="#about" className="text-[#F1F5F9] font-extrabold text-xl tracking-tight">
          SM
        </a>

        <ul className="hidden sm:flex items-center gap-8">
          {sections.map(section => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={
                  activeSection === section
                    ? 'text-[#3B82F6] font-medium text-sm'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] transition-colors text-sm'
                }
              >
                {LABELS[section]}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="sm:hidden text-[#94A3B8] p-1"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="sm:hidden bg-[#0F172A] border-t border-[#1E293B]">
          <ul className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
            {sections.map(section => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={
                    activeSection === section
                      ? 'text-[#3B82F6] font-medium block'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] transition-colors block'
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {LABELS[section]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
