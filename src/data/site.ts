/**
 * 站点内容配置 —— 想改个人信息，只改这个文件就够了。
 */
export interface NavItem {
  label: string
  code: string
  to: string
}

export interface Project {
  name: string
  year: string
  summary: string
  stack: string[]
  note: string
}

export interface ContactLink {
  label: string
  value: string
  href: string
}

export const site = {
  name: 'Kayne Peng',
  handle: 'kayne.peng',
  role: '全栈工程师',
  location: '永州 · 中国',
  title: 'Kayne Peng — 全栈工程师的笔记本',
  description: '一个全栈工程师的笔记：关于 Vue、TypeScript、服务端与工程化，以及把事情做对的过程。',
  tagline: '写代码，也写下为什么。',
  intro:
    '我做全栈：从界面一直做到接口、数据和模型能力。相信代码里最贵的东西是解释成本，所以这里尽量把结论和理由并排写出来。',
  /** 留空则不展示邮箱入口 */
  email: '',
  github: 'https://github.com/kaynePeng',
}

export const nav: NavItem[] = [
  { label: '首页', code: 'INDEX', to: '/' },
  { label: '文章', code: 'WRITING', to: '/writing' },
  { label: '项目', code: 'WORK', to: '/projects' },
  { label: '关于', code: 'ABOUT', to: '/about' },
]

export const now: { k: string; v: string }[] = [
  { k: '正在做', v: '把检索和评测接进一个内容型产品的问答链路' },
  { k: '正在学', v: 'LLM 应用的评测方法与上下文管理' },
  { k: '正在读', v: '《The Design of Everyday Things》' },
]

export const focus: string[] = [
  'Vue 3 组合式 API',
  'TypeScript 类型边界',
  'Node 接口与数据建模',
  'LLM 应用与 RAG',
]

export const projects: Project[] = [
  {
    name: '笔记站',
    year: '2026',
    summary: '就是你现在看的这个站点。Vue + TypeScript，内容走 Markdown，构建后托管在 GitHub Pages 上。',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'GitHub Actions'],
    note: '自建 · 持续维护',
  },
  {
    name: '知识问答检索',
    year: '2026',
    summary: '把内部文档做成能引用的问答：按结构切片、向量与关键词混合召回、回答带出处，改动后用问题集做回归。',
    stack: ['Node', '向量检索', 'LLM'],
    note: '内部项目',
  },
  {
    name: '组件规范检查器',
    year: '2025',
    summary: '把团队的口头约定翻译成可运行的检查项：命名、目录、props 契约，在 CI 里直接拦住不合规的提交。',
    stack: ['Node', 'TypeScript', 'CI'],
    note: '内部工具',
  },
  {
    name: '排期看板',
    year: '2024',
    summary: '给非技术同事用的轻量排期工具，重点不在功能多，而在任何人都能在没有说明文档的情况下用起来。',
    stack: ['Vue 3', 'Pinia', 'IndexedDB'],
    note: '实验项目',
  },
]

export const principles: { title: string; body: string }[] = [
  {
    title: '先让东西跑起来',
    body: '范围可以窄，但交付的每一块都要真能用。半截的功能比没有更消耗信任。',
  },
  {
    title: '把边界写清楚',
    body: '接口、类型、失败路径都是产品的一部分。写清楚一次，比解释十次便宜。',
  },
  {
    title: '克制地做视觉',
    body: '排版、间距和层级比装饰更有说服力。一个页面只留一个让人记住的地方。',
  },
]

export const contactLinks: ContactLink[] = [
  { label: 'GitHub', value: 'github.com/kaynePeng', href: site.github },
]

if (site.email) {
  contactLinks.push({ label: 'Email', value: site.email, href: `mailto:${site.email}` })
}
