/**
 * Markdown 渲染器。单独成模块，好让 markdown-it 被切成独立 chunk，
 * 只在打开文章页时才加载，不拖慢首页。
 */
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

/**
 * 文章里的图片按站点根路径写（`![](/images/x.png)`），构建时要补上部署前缀，
 * 否则发布到 /notes/ 子路径后图片会 404。
 */
function withBase(html: string): string {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return html
  const prefix = base.startsWith('/') ? base.slice(1) : base
  return html.replace(/(<img[^>]+src=")\/([^"]*)"/g, (_match, head: string, rest: string) =>
    rest.startsWith(prefix) ? `${head}/${rest}"` : `${head}${base}${rest}"`,
  )
}

export function renderBody(body: string): string {
  return withBase(md.render(body))
}
