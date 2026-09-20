import projectsData from '@/content/projects.json'
import type { Project } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectCard } from '@/components/ui/ProjectCard'

const projects = (projectsData as Project[])
  .filter(p => p.featured)
  .sort((a, b) => a.order - b.order)

export function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-clay text-xs tracking-[0.2em] uppercase font-semibold mb-3">Work</p>
          <h2 className="text-3xl font-bold text-ink mb-12">Selected Projects</h2>
        </AnimatedSection>

        {featured && (
          <AnimatedSection>
            <ProjectCard project={featured} wide />
          </AnimatedSection>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {rest.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.08}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
