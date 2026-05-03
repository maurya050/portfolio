import type { ExperienceEntry } from '@/types/content'
import { formatDate } from '@/utils/date'

interface ExperienceItemProps {
  entry: ExperienceEntry
}

export function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <article className="border-l-2 border-clay pl-6 py-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
        <div>
          <h3 className="text-ink font-semibold text-lg">{entry.company}</h3>
          <p className="text-clay font-medium">{entry.role}</p>
        </div>
        <div className="text-stone text-base text-right shrink-0">
          <p>
            {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
          </p>
          <p>{entry.location}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {entry.achievements.map((ach, i) => (
          <li
            key={i}
            className="text-ink/80 text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: ach.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        ))}
      </ul>
    </article>
  )
}
