<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Moon, Sun } from 'lucide-vue-next'
import { nav, site } from '@/data/site'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const { theme, toggle } = useTheme()

const progress = ref(0)
let ticking = false

function update() {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  ticking = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

const section = computed(() => {
  const code = route.meta.code
  return typeof code === 'string' ? code : 'INDEX'
})

const percent = computed(() => Math.round(progress.value * 100))
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="wordmark" :aria-label="`${site.name} 首页`">
        <span class="wordmark-name">{{ site.name }}</span>
        <span class="wordmark-mark" aria-hidden="true"></span>
      </RouterLink>

      <nav class="nav" aria-label="主导航">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="nav-link">
          {{ item.label }}
        </RouterLink>
      </nav>

      <button
        class="theme-toggle"
        type="button"
        :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
        @click="toggle"
      >
        <Sun v-if="theme === 'dark'" :size="16" />
        <Moon v-else :size="16" />
      </button>
    </div>

    <!-- 签名元素：标尺进度条，刻度沿用页面 28px 网格 -->
    <div class="ruler" aria-hidden="true">
      <div class="container ruler-inner">
        <span class="ruler-label">{{ section }}</span>
        <div class="ruler-track">
          <span class="ruler-ticks"></span>
          <span class="ruler-fill" :style="{ transform: `scaleX(${progress})` }"></span>
        </div>
        <span class="ruler-value">{{ String(percent).padStart(2, '0') }}%</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: color-mix(in srgb, var(--paper) 82%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: var(--header-h);
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.wordmark-name {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink);
}

.wordmark-mark {
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 1px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav-link {
  position: relative;
  font-size: 0.875rem;
  color: var(--muted);
  padding-block: 6px;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.nav-link:hover {
  color: var(--ink);
}

.nav-link.router-link-active {
  color: var(--ink);
}

.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  color: var(--ink-2);
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--line-strong);
  color: var(--accent);
  background: var(--surface);
}

.ruler {
  border-top: 1px solid var(--line);
  height: 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.ruler-inner {
  display: flex;
  align-items: center;
  gap: 14px;
}

.ruler-label,
.ruler-value {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.16em;
  color: var(--muted);
  white-space: nowrap;
}

.ruler-label {
  color: var(--accent);
}

.ruler-track {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 6px;
}

.ruler-ticks {
  display: block;
  width: 100%;
  height: 5px;
  background-image: repeating-linear-gradient(
    90deg,
    var(--line-strong) 0,
    var(--line-strong) 1px,
    transparent 1px,
    transparent 28px
  );
  opacity: 0.7;
}

.ruler-fill {
  position: absolute;
  left: 0;
  bottom: 5px;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform-origin: left;
  transition: transform 0.12s linear;
}

@media (max-width: 720px) {
  .header-inner {
    flex-wrap: wrap;
    height: auto;
    padding-block: 12px 8px;
    gap: 6px 16px;
  }

  .nav {
    order: 3;
    width: 100%;
    gap: 20px;
    overflow-x: auto;
  }

  .nav-link {
    font-size: 0.8125rem;
  }

  .theme-toggle {
    margin-left: auto;
  }

  .ruler {
    height: 20px;
  }

  .ruler-value {
    display: none;
  }
}
</style>
