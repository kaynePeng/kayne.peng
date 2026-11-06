import MarkdownIt from 'markdown-it'

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  readingTime: number
  order: number
}

export interface Post extends PostMeta {
  body: string
}

const rawFiles = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

function parseFrontMatter(source: string): { data: Record<string, string>; body: string } {
  const data: Record<string, string> = {}
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source)
  if (!match) return { data, body: source }

  const block = match[1] ?? ''
  const body = match[2] ?? ''
  for (const line of block.split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, '')
    if (key) data[key] = value
  }
  return { data, body }
}

function countReadingTime(text: string): number {
  const chinese = (text.match(/[\u4e00-\u9fa5]/g) ?? []).length
  const words = (text.match(/[a-zA-Z0-9]+/g) ?? []).length
  const minutes = Math.ceil(chinese / 350 + words / 220)
  return Math.max(1, minutes)
}

const posts: Post[] = Object.entries(rawFiles)
  .map(([path, source]) => {
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? path
    const { data, body } = parseFrontMatter(source)
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      tags: (data.tags ?? '')
        .split(/[,，]/)
        .map((tag) => tag.trim())
        .filter(Boolean),
      summary: data.summary ?? '',
      readingTime: countReadingTime(body),
      order: 0,
      body,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

// 编号按时间倒序，是真实的文章序号（INDEX 条目），不是装饰。
posts.forEach((post, index) => {
  post.order = posts.length - index
})

export const allPosts: PostMeta[] = posts.map((post) => ({
  slug: post.slug,
  title: post.title,
  date: post.date,
  tags: post.tags,
  summary: post.summary,
  readingTime: post.readingTime,
  order: post.order,
}))

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function relatedPosts(slug: string, limit = 2): PostMeta[] {
  const index = allPosts.findIndex((post) => post.slug === slug)
  if (index === -1) return []
  return allPosts.slice(index + 1, index + 1 + limit)
}

export function renderMarkdown(body: string): string {
  return md.render(body)
}

export function formatDate(date: string): string {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return `${parsed.getFullYear()}.${String(parsed.getMonth() + 1).padStart(2, '0')}.${String(
    parsed.getDate(),
  ).padStart(2, '0')}`
}

export function yearOf(date: string): string {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? '' : String(parsed.getFullYear())
}
