import projectsData from '@/content/projects.json'
import type { Project } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

const projects = (projectsData as Project[])
  .filter(p => p.featured)
  .sort((a, b) => a.order - b.order)

function splitSummary(summary: string): [string, string | null] {
  const dot = summary.indexOf('. ')
  if (dot === -1) return [summary, null]
  return [summary.slice(0, dot + 1), summary.slice(dot + 2)]
}

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#3D3328]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-[#A89070] text-xs tracking-[0.18em] uppercase font-semibold mb-3">Work</p>
          <h2 className="text-3xl font-bold text-[#F7F3ED] mb-12">Projects</h2>
        </AnimatedSection>
        <div className="space-y-10">
          {projects.map((project, i) => {
            const [primaryLine, detailLine] = splitSummary(project.summary)
            return (
              <AnimatedSection key={project.id} delay={i * 0.08}>
                <article className="border-l-2 border-[#C8864A] pl-6 py-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-[#F7F3ED] font-semibold text-lg">{project.title}</h3>
                      <p className="text-[#C4A882] text-base leading-relaxed mt-1 max-w-xl">{primaryLine}</p>
                      {detailLine && (
                        <p className="text-[#8A7060] text-sm leading-relaxed mt-1 max-w-xl italic">{detailLine}</p>
                      )}
                    </div>
                    <div className="flex gap-3 shrink-0 sm:pt-0.5">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-[#6B5A48] text-[#C8864A] hover:bg-[#4D4338] px-4 py-2 rounded text-sm font-medium transition-colors"
                        >
                          Repo
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#C8864A] text-[#3D3328] font-semibold hover:bg-[#D49A5E] px-4 py-2 rounded text-sm transition-colors"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.techStack.map(t => (
                      <Badge key={t} label={t} variant="dark" />
                    ))}
                  </div>
                </article>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
