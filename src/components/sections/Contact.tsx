import profileData from '@/content/profile.json'
import type { Profile } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

const profile = profileData as Profile

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-clay text-xs tracking-[0.2em] uppercase font-semibold mb-3">Get in touch</p>
          <h2 className="text-3xl font-bold text-ink mb-4">Let&apos;s build something.</h2>
          <p className="text-stone text-base mb-12 max-w-md">
            Open to full-time roles, interesting projects, or conversations about distributed systems and AI engineering.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-col gap-0 max-w-sm">
            <a
              href={`mailto:${profile.social.email}`}
              className="flex items-center justify-between py-4 border-b border-mist text-ink hover:text-clay transition-colors group"
            >
              <span className="text-stone text-xs uppercase tracking-widest">Email</span>
              <span className="text-sm group-hover:underline">{profile.social.email}</span>
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 border-b border-mist text-ink hover:text-clay transition-colors group"
            >
              <span className="text-stone text-xs uppercase tracking-widest">GitHub</span>
              <span className="text-sm group-hover:underline">@maurya050</span>
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 border-b border-mist text-ink hover:text-clay transition-colors group"
            >
              <span className="text-stone text-xs uppercase tracking-widest">LinkedIn</span>
              <span className="text-sm group-hover:underline">sm218</span>
            </a>
            {profile.social.leetcode && (
              <a
                href={profile.social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 border-b border-mist text-ink hover:text-clay transition-colors group"
              >
                <span className="text-stone text-xs uppercase tracking-widest">LeetCode</span>
                <span className="text-sm group-hover:underline">sm218</span>
              </a>
            )}
          </div>

          <div className="mt-10">
            <Button variant="primary" href={`mailto:${profile.social.email}`}>
              Send an Email →
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
