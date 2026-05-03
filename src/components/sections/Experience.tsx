import experienceData from '@/content/experience.json'
import type { ExperienceEntry } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ExperienceItem } from '@/components/ui/ExperienceItem'

const entries = (experienceData as ExperienceEntry[]).sort((a, b) => a.order - b.order)

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-sand">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-ink mb-12">Experience</h2>
        </AnimatedSection>
        <div className="space-y-12">
          {entries.map((entry, i) => (
            <AnimatedSection key={entry.id} delay={i * 0.1}>
              <ExperienceItem entry={entry} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
