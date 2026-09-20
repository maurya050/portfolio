import educationData from '@/content/education.json'
import type { EducationEntry } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const entries = (educationData as EducationEntry[]).sort((a, b) => a.order - b.order)

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-clay text-xs tracking-[0.2em] uppercase font-semibold mb-3">Background</p>
          <h2 className="text-3xl font-bold text-ink mb-12">Education</h2>
        </AnimatedSection>

        <div className="space-y-4">
          {entries.map((entry, i) => (
            <AnimatedSection key={entry.id} delay={i * 0.1}>
              <div className="bg-parchment border border-mist rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-clay/40 transition-colors">
                <div>
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-semibold text-lg hover:text-clay transition-colors"
                  >
                    {entry.institution}
                  </a>
                  <p className="text-stone text-sm mt-1">{entry.degree}</p>
                  <p className="text-stone/70 text-sm">{entry.field}</p>
                </div>
                <div className="flex flex-row sm:flex-col sm:items-end gap-3 shrink-0">
                  <span className="text-stone text-sm">{entry.startYear} – {entry.endYear}</span>
                  {entry.gpa && (
                    <span className="bg-mist/60 text-clay text-xs font-semibold px-2.5 py-1 rounded">
                      GPA {entry.gpa}
                    </span>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
