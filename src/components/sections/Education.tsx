import educationData from '@/content/education.json'
import type { EducationEntry } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const entries = (educationData as EducationEntry[]).sort((a, b) => a.order - b.order)

export function Education() {
  return (
    <section id="education" className="py-24 bg-[#0A0F1E]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-[#3B82F6] text-xs tracking-[0.2em] uppercase font-semibold mb-3">Background</p>
          <h2 className="text-3xl font-bold text-[#F1F5F9] mb-12">Education</h2>
        </AnimatedSection>

        <div className="space-y-4">
          {entries.map((entry, i) => (
            <AnimatedSection key={entry.id} delay={i * 0.1}>
              <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-[#1E3A5F] transition-colors">
                <div>
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F1F5F9] font-semibold text-lg hover:text-[#60A5FA] transition-colors"
                  >
                    {entry.institution}
                  </a>
                  <p className="text-[#94A3B8] text-sm mt-1">{entry.degree}</p>
                  <p className="text-[#475569] text-sm">{entry.field}</p>
                </div>
                <div className="flex flex-row sm:flex-col sm:items-end gap-3 shrink-0">
                  <span className="text-[#475569] text-sm">{entry.startYear} – {entry.endYear}</span>
                  {entry.gpa && (
                    <span className="bg-[#1E3A5F] text-[#60A5FA] text-xs font-semibold px-2.5 py-1 rounded">
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
