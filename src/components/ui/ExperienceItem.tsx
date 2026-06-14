import type { ExperienceEntry } from '@/types/content'
import { formatDate } from '@/utils/date'

interface ExperienceItemProps {
  entry: ExperienceEntry
}

export function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <article className="relative pl-6 border-l border-[#1E3A5F]">
      {/* Timeline dot */}
      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
        <div>
          <h3 className="text-[#F1F5F9] font-semibold text-lg">{entry.company}</h3>
          <p className="text-[#3B82F6] font-medium text-sm">{entry.role}</p>
        </div>
        <div className="text-[#475569] text-sm text-right shrink-0">
          <p>{formatDate(entry.startDate)} – {formatDate(entry.endDate)}</p>
          <p>{entry.location}</p>
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {entry.achievements.map((ach, i) => (
          <li key={i} className="text-[#94A3B8] text-sm leading-relaxed pl-4 relative">
            <span className="absolute left-0 text-[#3B82F6] select-none">·</span>
            <span dangerouslySetInnerHTML={{ __html: ach.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#F1F5F9]">$1</strong>') }} />
          </li>
        ))}
      </ul>

      {entry.techTags && entry.techTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.techTags.map(tag => (
            <span key={tag} className="bg-[#1E3A5F] text-[#60A5FA] text-xs font-medium px-2.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
