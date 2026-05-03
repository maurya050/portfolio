import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

const profile = profileData as Profile

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-parchment">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-stone text-xs tracking-[0.2em] uppercase font-medium mb-3">Get in touch</p>
          <h2 className="text-3xl font-bold text-ink mb-10">Contact.</h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="space-y-2 max-w-sm">
            <a
              href={`mailto:${profile.social.email}`}
              className="flex items-center justify-between py-3 border-b border-mist text-ink hover:text-clay transition-colors group"
            >
              <span className="text-stone text-xs uppercase tracking-widest">Email</span>
              <span className="text-sm group-hover:underline">{profile.social.email}</span>
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-3 border-b border-mist text-ink hover:text-clay transition-colors group"
            >
              <span className="text-stone text-xs uppercase tracking-widest">GitHub</span>
              <span className="text-sm group-hover:underline">@maurya050</span>
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-3 border-b border-mist text-ink hover:text-clay transition-colors group"
            >
              <span className="text-stone text-xs uppercase tracking-widest">LinkedIn</span>
              <span className="text-sm group-hover:underline">shivam-maurya</span>
            </a>
            {profile.resume && (
              <a
                href={`/portfolio/${profile.resume}`}
                download
                className="flex items-center justify-between py-3 border-b border-mist text-ink hover:text-clay transition-colors group"
              >
                <span className="text-stone text-xs uppercase tracking-widest">Résumé</span>
                <span className="text-sm group-hover:underline">Download PDF</span>
              </a>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
