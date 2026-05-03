import projectsData from '@/content/projects.json'
import type { Project } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const projects = (projectsData as Project[])
  .filter(p => p.featured)
  .sort((a, b) => a.order - b.order)

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-parchment">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-ink mb-12">Projects.</h2>
        </AnimatedSection>
        <div className="space-y-10">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.08}>
              <article className="border-l-2 border-clay pl-6 py-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-ink font-semibold text-lg">{project.title}</h3>
                    <p className="text-stone text-base leading-relaxed mt-1 max-w-xl">{project.summary}</p>
                  </div>
                  <div className="flex gap-3 shrink-0 sm:pt-0.5">
                    {project.repo && (
                      <Button variant="ghost" href={project.repo}>Repo</Button>
                    )}
                    {project.demo && (
                      <Button variant="primary" href={project.demo}>Demo</Button>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.techStack.map(t => (
                    <Badge key={t} label={t} />
                  ))}
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
