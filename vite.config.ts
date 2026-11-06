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
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'markdown',
              test: /node_modules[\\/](?:markdown-it|linkify-it|mdurl|uc\.micro|entities)[\\/]/,
              priority: 20,
            },
            {
              name: 'vue',
              test: /node_modules[\\/](?:@vue[\\/]|vue[\\/]|vue-router[\\/])/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
}))
