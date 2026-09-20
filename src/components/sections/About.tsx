import { Link } from 'react-router-dom'
import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'
import { Button } from '@/components/ui/Button'

const profile = profileData as Profile

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: 'M+', label: 'Users Served' },
  { value: '500+', label: 'LeetCode Solved' },
  { value: 'AIR 424', label: 'GATE CS 2022' },
]

export function About() {
  return (
    <section id="about" className="px-6 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div>
          <p className="text-clay text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            Software Engineer
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-[1.08] tracking-tight mb-6">
            {profile.name}
          </h1>

          <p className="text-stone text-base sm:text-lg leading-relaxed mb-10 max-w-md">
            {profile.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {profile.resume ? (
              <Button variant="primary" href={profile.resume} download>
                Download CV
              </Button>
            ) : (
              <Button variant="primary" href={`mailto:${profile.social.email}`}>
                Get in Touch
              </Button>
            )}
            <Link
              to="/projects"
              className="inline-flex items-center justify-center border border-clay text-clay hover:bg-clay/10 px-5 py-2.5 rounded text-base font-medium transition-colors"
            >
              See my work →
            </Link>
          </div>

          <nav aria-label="Social links" className="flex items-center gap-6 text-sm">
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-stone hover:text-clay transition-colors">GitHub</a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-stone hover:text-clay transition-colors">LinkedIn</a>
            {profile.social.leetcode && (
              <a href={profile.social.leetcode} target="_blank" rel="noopener noreferrer" className="text-stone hover:text-clay transition-colors">LeetCode</a>
            )}
            <a href={`mailto:${profile.social.email}`} className="text-stone hover:text-clay transition-colors">Email</a>
          </nav>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <img
            src="/assets/images/profile_image.png"
            alt={profile.name}
            width={220}
            height={220}
            className="w-40 h-40 sm:w-56 sm:h-56 rounded-2xl object-cover border border-mist"
          />
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-parchment border border-mist rounded-lg px-4 py-3 text-center md:text-right">
                <div className="text-ink text-lg font-bold">{stat.value}</div>
                <div className="text-stone text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
