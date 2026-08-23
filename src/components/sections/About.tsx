import { Link } from 'react-router-dom'
import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'

const profile = profileData as Profile

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: 'M+', label: 'Users Served' },
  { value: '500+', label: 'LeetCode Solved' },
  { value: 'AIR 424', label: 'GATE CS 2022' },
]

export function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center relative px-6 py-24"
      style={{
        background: 'linear-gradient(180deg, #0A0F1E 0%, #10182E 55%, #0A0F1E 100%)',
      }}
    >
      {/* Blue glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Label */}
        <p className="text-[#3B82F6] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
          Software Engineer
        </p>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#F1F5F9] leading-[1.05] tracking-tight mb-6">
          {profile.name}
        </h1>

        {/* Subline */}
        <p className="text-[#94A3B8] text-base sm:text-lg mb-10 max-w-md mx-auto">
          {profile.bio}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-xl mx-auto">
          {STATS.map(stat => (
            <div
              key={stat.label}
              className="bg-[#0A0F1E]/60 backdrop-blur-sm border border-[#1E3A5F] rounded-lg px-4 py-4"
            >
              <div className="text-[#3B82F6] text-xl font-bold">{stat.value}</div>
              <div className="text-[#475569] text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {profile.resume ? (
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          ) : (
            <a
              href={`mailto:${profile.social.email}`}
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Get in Touch
            </a>
          )}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border border-[#1E3A5F] text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#3B82F6] font-medium px-6 py-3 rounded-lg transition-colors"
          >
            See my work
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>

        {/* Social links */}
        <nav aria-label="Social links" className="flex items-center justify-center gap-6 mt-10 text-sm">
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-[#475569] hover:text-[#60A5FA] transition-colors">GitHub</a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#475569] hover:text-[#60A5FA] transition-colors">LinkedIn</a>
          {profile.social.leetcode && (
            <a href={profile.social.leetcode} target="_blank" rel="noopener noreferrer" className="text-[#475569] hover:text-[#60A5FA] transition-colors">LeetCode</a>
          )}
          <a href={`mailto:${profile.social.email}`} className="text-[#475569] hover:text-[#60A5FA] transition-colors">Email</a>
        </nav>
      </div>

    </section>
  )
}
