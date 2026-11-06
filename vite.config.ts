import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 站点最终挂在 GitHub Pages 的项目子路径下（https://<user>.github.io/notes/），
// 所以构建和预览时 base 必须是 `/notes/`；本地开发仍然挂在根路径。
// 换成自定义域名或用户主页仓库（<user>.github.io）时，用环境变量 VITE_BASE 覆盖即可。
export default defineConfig(({ command, isPreview }) => ({
  base: process.env.VITE_BASE ?? (command === 'build' || isPreview ? '/notes/' : '/'),
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // 首屏只需要 Vue 运行时和路由；markdown-it 只在文章页按需加载。
    // 把框架代码单独切出来，内容更新时浏览器还能复用旧的缓存。
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (
            id.includes('markdown-it') ||
            id.includes('linkify-it') ||
            id.includes('mdurl') ||
            id.includes('uc.micro') ||
            id.includes('entities')
          ) {
            return 'markdown'
          }
          if (id.includes('/vue') || id.includes('@vue')) return 'vue'
        },
      },
    },
  },
}))
