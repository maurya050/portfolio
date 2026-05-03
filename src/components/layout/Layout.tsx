import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
  activeSection: string
  showBlogNav: boolean
}

export function Layout({ children, activeSection, showBlogNav }: LayoutProps) {
  return (
    <>
      <Header activeSection={activeSection} showBlogNav={showBlogNav} />
      <main className="min-h-screen bg-sand text-ink">{children}</main>
      <Footer />
    </>
  )
}
