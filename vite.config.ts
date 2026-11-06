import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 站点最终挂在 GitHub Pages 的项目子路径下（https://<user>.github.io/kayne.peng/），
// 所以构建时 base 必须是 `/kayne.peng/`；本地开发仍然挂在根路径。
// 换成自定义域名或用户主页仓库（<user>.github.io）时，用环境变量 VITE_BASE 覆盖即可。
export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE ?? (command === 'build' ? '/kayne.peng/' : '/'),
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
