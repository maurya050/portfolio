import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import { formatDate } from '@/utils/date'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const posts = useBlogPosts()

  if (posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-stone">Loading…</div>
    )
  }

  const post = posts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/" replace />

  return (
    <>
      <Helmet>
        <title>{post.title} — Shivam Maurya</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <main className="max-w-3xl mx-auto px-6 py-24 bg-sand min-h-screen">
        <a
          href="/portfolio/"
          className="text-clay hover:underline text-sm mb-8 inline-block"
        >
          ← Back
        </a>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-ink mb-3">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-stone text-sm">
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>
        <div
          className="prose prose-stone max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </main>
    </>
  )
}
