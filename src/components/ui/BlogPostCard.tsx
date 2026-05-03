import type { BlogPost } from '@/types/content'
import { formatDate } from '@/utils/date'
import { Badge } from './Badge'

interface BlogPostCardProps {
  post: Omit<BlogPost, 'body'>
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="border-b border-mist py-6 last:border-b-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <a
          href={`/portfolio/blog/${post.slug}`}
          className="text-ink font-medium hover:text-clay transition-colors text-lg"
        >
          {post.title}
        </a>
        <span className="text-stone text-base shrink-0">
          {formatDate(post.date)} · {post.readingTime} min read
        </span>
      </div>
      <p className="text-stone text-base leading-relaxed mb-3">{post.excerpt}</p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map(t => (
            <Badge key={t} label={t} />
          ))}
        </div>
      )}
    </article>
  )
}
