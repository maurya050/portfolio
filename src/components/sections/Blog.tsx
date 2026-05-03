import { useBlogPosts } from '@/hooks/useBlogPosts'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { BlogPostCard } from '@/components/ui/BlogPostCard'

export function Blog() {
  const posts = useBlogPosts()
  if (posts.length === 0) return null

  return (
    <section id="blog" className="py-24 bg-sand">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-ink mb-12">Writing</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div>
            {posts.map(post => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
