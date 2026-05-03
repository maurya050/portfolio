import { motion } from 'framer-motion'
import type { Project } from '@/types/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Badge } from './Badge'
import { Button } from './Button'

interface ProjectCardProps {
  project: Project
  wide?: boolean
}

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  const reduced = useReducedMotion()

  const inner = wide ? (
    <article className="bg-sand border border-mist rounded-xl p-8 flex flex-col sm:flex-row gap-8">
      <div className="flex-1 min-w-0">
        <h3 className="text-ink font-semibold text-xl mb-3">{project.title}</h3>
        <p className="text-stone text-sm leading-relaxed mb-5">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map(t => (
            <Badge key={t} label={t} />
          ))}
        </div>
      </div>
      <div className="flex sm:flex-col gap-3 sm:justify-end shrink-0">
        {project.repo && (
          <Button variant="ghost" href={project.repo}>Repo</Button>
        )}
        {project.demo && (
          <Button variant="primary" href={project.demo}>Demo</Button>
        )}
      </div>
    </article>
  ) : (
    <article className="bg-parchment border border-mist rounded-lg p-6 flex flex-col gap-4 h-full">
      <h3 className="text-ink font-semibold text-lg">{project.title}</h3>
      <p className="text-stone text-sm leading-relaxed flex-1">{project.summary}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map(t => (
          <Badge key={t} label={t} />
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        {project.repo && (
          <Button variant="ghost" href={project.repo}>Repo</Button>
        )}
        {project.demo && (
          <Button variant="primary" href={project.demo}>Demo</Button>
        )}
      </div>
    </article>
  )

  if (reduced) {
    return <div>{inner}</div>
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {inner}
    </motion.div>
  )
}
