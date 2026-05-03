import { useState, useEffect } from 'react'
import { parseMarkdown } from '@/utils/markdown'
import type { BlogPost } from '@/types/content'

const modules = import.meta.glob('@/content/blog/*.md', { query: '?raw', import: 'default', eager: false })

export function useBlogPosts(): BlogPost[] {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const load = async () => {
      const results: BlogPost[] = []

      for (const [path, loader] of Object.entries(modules)) {
        const raw = (await (loader as () => Promise<string>)()) as string
        const { frontmatter, body } = await parseMarkdown(raw)
        if (!frontmatter.published) continue

        const filename = path.split('/').pop()?.replace('.md', '') ?? 'post'
        const words = raw.replace(/---[\s\S]*?---/, '').trim().split(/\s+/).length

        results.push({
          slug: filename,
          title: String(frontmatter.title ?? ''),
          date: String(frontmatter.date ?? ''),
          tags: Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [],
          excerpt: String(frontmatter.excerpt ?? ''),
          published: Boolean(frontmatter.published),
          body,
          readingTime: Math.max(1, Math.ceil(words / 200)),
        })
      }

      results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setPosts(results)
    }

    load()
  }, [])

  return posts
}
