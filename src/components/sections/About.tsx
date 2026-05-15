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

const PRIMARY_SKILLS = ['Java', 'Spring Boot', 'JavaScript', 'React.js', 'Node.js', 'Python', 'LangChain']
const SECONDARY_SKILLS = ['MongoDB', 'Next.js', 'Express.js', 'C++', 'Bootstrap']

export function About() {
  const [photoError, setPhotoError] = useState(false)

  return (
    <section id="about" className="bg-sand">
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

          {/* Right — content */}
          <div className="flex-1">
            <p className="text-stone text-base tracking-[0.2em] uppercase mb-8 font-medium">
              Full Stack Engineer · Agentic AI
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-ink leading-[1.05] mb-8">
              {nameParts.map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>

            <p className="text-[#3A2E22] text-base leading-relaxed mb-6">
              {profile.tagline}
            </p>

            {profile.bio && (
              <p className="text-[#5A4A38] text-base leading-loose mb-8 border-l-2 border-clay pl-4 max-w-lg">
                {profile.bio}
              </p>
            )}

            <nav aria-label="Social links" className="flex gap-7 text-base mb-4">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5A2B] hover:text-ink border-b border-transparent hover:border-ink/40 pb-0.5 transition-colors"
              >
                GitHub
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5A2B] hover:text-ink border-b border-transparent hover:border-ink/40 pb-0.5 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.social.email}`}
                className="text-[#8B5A2B] hover:text-ink border-b border-transparent hover:border-ink/40 pb-0.5 transition-colors"
              >
                Email
              </a>
            </nav>

            {profile.availability && (
              <p className="text-base text-sage font-medium tracking-wide mb-10">
                {profile.availability}
              </p>
            )}

            {/* Skills strip */}
            <div className="border-t border-mist pt-8">
              <p className="text-stone text-xs tracking-[0.18em] uppercase font-semibold mb-4">
                Core Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {PRIMARY_SKILLS.map(skill => (
                  <span
                    key={skill}
                    className="bg-[#3D3328] text-[#C8864A] text-sm font-medium px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {SECONDARY_SKILLS.map(skill => (
                  <span
                    key={skill}
                    className="bg-parchment text-[#6B5035] text-sm font-medium px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
