import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const profile = profileData as Profile

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#3D3328]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-[#A89070] text-xs tracking-[0.18em] uppercase font-semibold mb-10">
            Get in touch
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16">

            {/* Left — headline + CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#F7F3ED] leading-tight mb-5">
                Let&apos;s build<br />something<br />together.
              </h2>
              <p className="text-[#A89070] text-base leading-relaxed mb-8 max-w-sm">
                Open to full-time roles, freelance projects, or just a conversation about AI systems and engineering.
              </p>
              <a
                href={`mailto:${profile.social.email}`}
                className="inline-block bg-[#C8864A] text-[#3D3328] font-bold text-base px-6 py-3 rounded hover:bg-[#D49A5E] transition-colors"
              >
                Send an Email →
              </a>
            </div>

            {/* Right — links + availability */}
            <div className="flex flex-col justify-center">
              <a
                href={`mailto:${profile.social.email}`}
                className="flex items-center justify-between py-3 border-b border-[#4D4338] text-[#F7F3ED] hover:text-[#C8864A] transition-colors group"
              >
                <span className="text-[#8A7060] text-xs uppercase tracking-widest">Email</span>
                <span className="text-sm group-hover:underline">{profile.social.email}</span>
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 border-b border-[#4D4338] text-[#F7F3ED] hover:text-[#C8864A] transition-colors group"
              >
                <span className="text-[#8A7060] text-xs uppercase tracking-widest">GitHub</span>
                <span className="text-sm group-hover:underline">@maurya050</span>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 border-b border-[#4D4338] text-[#F7F3ED] hover:text-[#C8864A] transition-colors group"
              >
                <span className="text-[#8A7060] text-xs uppercase tracking-widest">LinkedIn</span>
                <span className="text-sm group-hover:underline">shivam-maurya</span>
              </a>
              {profile.availability && (
                <div className="flex items-center gap-2 pt-4">
                  <span className="w-2 h-2 rounded-full bg-sage inline-block" aria-hidden="true" />
                  <span className="text-sage text-sm font-medium">{profile.availability}</span>
                </div>
              )}
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
