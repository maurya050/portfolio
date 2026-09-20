import { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface HeaderProps {
  showBlogNav: boolean
}

const NAV_ITEMS = [
  { to: '/', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/contact', label: 'Contact' },
]

export function Header({ showBlogNav }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const items = showBlogNav
    ? [...NAV_ITEMS.slice(0, 4), { to: '/blog', label: 'Writing' }, NAV_ITEMS[4]]
    : NAV_ITEMS

  return (
    <header className="sticky top-0 z-50 bg-sand/90 backdrop-blur border-b border-mist">
      <nav
        aria-label="Main navigation"
        className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <NavLink to="/" className="flex items-center">
          <img
            src="/assets/images/profile_image.png"
            alt="Shivam Maurya"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-mist hover:ring-clay transition-all"
          />
        </NavLink>

        <ul className="hidden sm:flex items-center gap-8">
          {items.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-clay font-medium text-sm'
                    : 'text-stone hover:text-ink transition-colors text-sm'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="sm:hidden text-stone p-1"
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
        <div id="mobile-menu" className="sm:hidden bg-sand border-t border-mist">
          <ul className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
            {items.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-clay font-medium block'
                      : 'text-stone hover:text-ink transition-colors block'
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
