import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/)
  if (!match) return { frontmatter: {}, content: raw }

  const content = match[2] ?? ''
  const frontmatter: Record<string, unknown> = {}

  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(':')
    if (colonIdx < 1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim()
    if (val.startsWith('[') && val.endsWith(']')) {
      frontmatter[key] = val
        .slice(1, -1)
        .split(',')
        .map(v => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (val === 'true') frontmatter[key] = true
    else if (val === 'false') frontmatter[key] = false
    else if (val !== '' && !isNaN(Number(val))) frontmatter[key] = Number(val)
    else frontmatter[key] = val.replace(/^["']|["']$/g, '')
  }

  return { frontmatter, content }
}

export async function parseMarkdown(
  raw: string,
): Promise<{ frontmatter: Record<string, unknown>; body: string }> {
  const { frontmatter, content } = parseFrontmatter(raw)
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content)
  return { frontmatter, body: String(result) }
}
