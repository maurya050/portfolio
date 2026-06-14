import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
  showBlogNav: boolean
}

export function Layout({ children, showBlogNav }: LayoutProps) {
  return (
    <>
      <Header showBlogNav={showBlogNav} />
      <main className="min-h-screen bg-[#0A0F1E] text-[#F1F5F9]">{children}</main>
      <Footer />
    </>
  )
}
