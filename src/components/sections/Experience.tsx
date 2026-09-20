import experienceData from '@/content/experience.json'
import type { ExperienceEntry } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ExperienceItem } from '@/components/ui/ExperienceItem'

const entries = (experienceData as ExperienceEntry[]).sort((a, b) => a.order - b.order)

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-clay text-xs tracking-[0.2em] uppercase font-semibold mb-3">Career</p>
          <h2 className="text-3xl font-bold text-ink mb-12">Experience</h2>
        </AnimatedSection>
        <div className="space-y-8">
          {entries.map((entry, i) => (
            <AnimatedSection key={entry.id} delay={i * 0.08}>
              <ExperienceItem entry={entry} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
