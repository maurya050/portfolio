import educationData from '@/content/education.json'
import type { EducationEntry } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const entries = (educationData as EducationEntry[]).sort((a, b) => a.order - b.order)

export function Education() {
  return (
    <section id="education" className="py-24 bg-[#EDE8DC]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-stone text-xs tracking-[0.18em] uppercase font-semibold mb-3">Background</p>
          <h2 className="text-3xl font-bold text-ink mb-12">Education</h2>
        </AnimatedSection>

        <div className="space-y-6">
          {entries.map((entry, i) => (
            <AnimatedSection key={entry.id} delay={i * 0.1}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-[#C4B89A] pb-6">
                <div>
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-ink hover:text-clay transition-colors"
                  >
                    {entry.institution}
                  </a>
                  <p className="text-[#3A2E22] text-sm mt-1">{entry.degree}</p>
                  <p className="text-stone text-sm">{entry.field}</p>
                </div>

                <div className="flex flex-row sm:flex-col sm:items-end gap-3 sm:gap-1 shrink-0">
                  <span className="text-stone text-sm">
                    {entry.startYear} – {entry.endYear}
                  </span>
                  {entry.gpa && (
                    <span className="inline-block bg-parchment text-[#6B5035] text-xs font-semibold px-2.5 py-1 rounded">
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
