import { useState } from 'react'
import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'

const profile = profileData as Profile

const initials = profile.name
  .split(' ')
  .map((w: string) => w[0])
  .join('')
  .toUpperCase()
  .slice(0, 2)

const nameParts = profile.name.split(' ')

export function About() {
  const [photoError, setPhotoError] = useState(false)

  return (
    <section id="about" className="min-h-screen flex items-center bg-sand">
      <div className="max-w-5xl mx-auto px-6 py-24 w-full">
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-20">

          {/* Left — photo */}
          <div className="shrink-0 md:pt-16">
            {photoError || !profile.photo ? (
              <div
                aria-label={`${profile.name} — portrait`}
                className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-mist flex items-center justify-center"
              >
                <span className="text-3xl font-bold text-clay select-none">{initials}</span>
              </div>
            ) : (
              <img
                src={`/portfolio/${profile.photo}`}
                alt={`${profile.name} — portrait`}
                width={208}
                height={208}
                fetchPriority="high"
                className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover ring-4 ring-mist"
                onError={() => setPhotoError(true)}
              />
            )}
          </div>

          {/* Right — dominant content */}
          <div className="ml-auto">
            <p className="text-stone text-base tracking-[0.2em] uppercase mb-8 font-medium">
              Full Stack Engineer · Agentic AI
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-ink leading-[1.05] mb-8">
              {nameParts.map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>

            <p className="text-stone text-base leading-relaxed max-w-xs mb-10">
              {profile.tagline}
            </p>

            <nav aria-label="Social links" className="flex gap-7 text-base">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-ink border-b border-transparent hover:border-ink/40 pb-0.5 transition-colors"
              >
                GitHub
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-ink border-b border-transparent hover:border-ink/40 pb-0.5 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.social.email}`}
                className="text-stone hover:text-ink border-b border-transparent hover:border-ink/40 pb-0.5 transition-colors"
              >
                Email
              </a>
            </nav>

            {profile.availability && (
              <p className="mt-8 text-base text-sage font-medium tracking-wide">
                {profile.availability}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
