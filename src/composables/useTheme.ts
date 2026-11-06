import { ref, watch } from 'vue'

export type ThemeName = 'light' | 'dark'

const STORAGE_KEY = 'kayne.peng.theme'

function initialTheme(): ThemeName {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref<ThemeName>(initialTheme())

function apply(value: ThemeName) {
  document.documentElement.dataset.theme = value
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', value === 'dark' ? '#101312' : '#f3f4ef')
}

watch(theme, (value) => {
  localStorage.setItem(STORAGE_KEY, value)
  apply(value)
})

apply(theme.value)

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
