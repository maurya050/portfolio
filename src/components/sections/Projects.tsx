import projectsData from '@/content/projects.json'
import type { Project } from '@/types/content'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const projects = (projectsData as Project[])
  .filter(p => p.featured)
  .sort((a, b) => a.order - b.order)

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#0F172A]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-[#3B82F6] text-xs tracking-[0.2em] uppercase font-semibold mb-3">Work</p>
          <h2 className="text-3xl font-bold text-[#F1F5F9] mb-12">Projects</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.08}>
              <article className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 flex flex-col gap-4 h-full hover:border-[#1E3A5F] transition-colors">
                <div>
                  <h3 className="text-[#F1F5F9] font-semibold text-base mb-2">{project.title}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{project.summary}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.techStack.map(t => (
                    <span key={t} className="bg-[#1E3A5F] text-[#60A5FA] text-xs font-medium px-2.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2 border-t border-[#1E293B]">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#60A5FA] text-sm font-medium transition-colors"
                    >
                      Repo →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3B82F6] hover:text-[#60A5FA] text-sm font-semibold transition-colors"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
