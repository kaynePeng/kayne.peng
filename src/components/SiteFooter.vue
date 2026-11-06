<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { nav, site } from '@/data/site'

const year = new Date().getFullYear()

function backToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <p class="footer-name">{{ site.name }}</p>
          <p class="footer-line">{{ site.role }} · {{ site.location }}</p>
        </div>
        <nav class="footer-nav" aria-label="页脚导航">
          <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="footer-link">
            {{ item.label }}
          </RouterLink>
          <a :href="site.github" target="_blank" rel="noreferrer" class="footer-link">GitHub</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <p class="mono">© {{ year }} {{ site.name }}</p>
        <button type="button" class="mono to-top" @click="backToTop">回到顶部 ↑</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--line);
  background: var(--surface);
}

.footer-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  padding-block: 40px 32px;
  flex-wrap: wrap;
}

.footer-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--ink);
}

.footer-line {
  font-size: 0.8125rem;
  color: var(--muted);
  margin-top: 4px;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
}

.footer-link {
  font-size: 0.8125rem;
  color: var(--muted);
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--accent);
}

.to-top {
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  color: var(--muted);
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.to-top:hover {
  color: var(--accent);
}

.to-top:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 16px 24px;
  border-top: 1px solid var(--line);
  flex-wrap: wrap;
}
</style>
