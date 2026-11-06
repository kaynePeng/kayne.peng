import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

/**
 * markdown-it 只在文章页需要，所以是独立 chunk。首屏加载完、浏览器空闲时提前拉一次，
 * 点进文章就不用等它下载；开着省流量模式（saveData）的设备跳过。
 */
function warmMarkdownRenderer() {
  if (navigator.onLine === false) return
  if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return
  void import('@/lib/markdown').catch(() => {})
}

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(warmMarkdownRenderer, { timeout: 4000 })
} else {
  setTimeout(warmMarkdownRenderer, 2000)
}
