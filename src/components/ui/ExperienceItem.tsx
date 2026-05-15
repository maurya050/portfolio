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
        <div className="text-[#8B6B4A] text-base text-right shrink-0">
          <p>
            {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
          </p>
          <p>{entry.location}</p>
        </div>
      </div>
      <ul className="space-y-2 mb-4">
        {entry.achievements.map((ach, i) => (
          <li
            key={i}
            className="text-[#3A2E22] text-base leading-relaxed pl-4 relative"
          >
            <span className="absolute left-0 text-clay select-none">·</span>
            <span
              dangerouslySetInnerHTML={{
                __html: ach.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          </li>
        ))}
      </ul>
      {entry.techTags && entry.techTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.techTags.map(tag => (
            <span
              key={tag}
              className="bg-parchment text-[#6B5035] text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
