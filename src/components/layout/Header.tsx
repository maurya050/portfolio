import { useState } from 'react'

interface HeaderProps {
  activeSection: string
  showBlogNav: boolean
}

const NAV_SECTIONS = ['about', 'projects', 'experience', 'contact'] as const
const LABELS: Record<string, string> = {
  about: 'Home',
  projects: 'Projects',
  experience: 'Experience',
  contact: 'Contact',
  blog: 'Writing',
}

export function Header({ activeSection, showBlogNav }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const sections = showBlogNav
    ? [...NAV_SECTIONS.slice(0, 3), 'blog', NAV_SECTIONS[3]]
    : [...NAV_SECTIONS]

  return (
    <header className="sticky top-0 z-50 bg-sand/95 backdrop-blur border-b border-mist">
      <nav
        aria-label="Main navigation"
        className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <a href="#about" className="text-ink font-semibold text-2xl">
          Shivam Maurya
        </a>

        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center gap-6">
          {sections.map(section => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={
                  activeSection === section
                    ? 'text-clay font-medium'
                    : 'text-stone hover:text-ink transition-colors'
                }
              >
                {LABELS[section]}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="sm:hidden text-ink p-1"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div id="mobile-menu" className="sm:hidden bg-sand border-t border-mist">
          <ul className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
            {sections.map(section => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={
                    activeSection === section
                      ? 'text-clay font-medium block'
                      : 'text-stone hover:text-ink transition-colors block'
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
