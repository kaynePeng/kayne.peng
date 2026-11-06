<script setup lang="ts">
import { projects } from '@/data/site'
</script>

<template>
  <div class="page">
    <section class="container list-head">
      <p class="eyebrow">WORK</p>
      <h1 class="list-title">项目</h1>
      <p class="list-intro">
        一些自己发起或长期维护的东西。多数不追求功能多，而是把一件事做完整。
      </p>
    </section>

    <section class="container">
      <ul class="project-list">
        <li v-for="(project, index) in projects" :key="project.name" class="project">
          <div class="project-head">
            <span class="mono project-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="mono project-year">{{ project.year }}</span>
            <span class="mono project-note">{{ project.note }}</span>
          </div>
          <h2 class="project-name">{{ project.name }}</h2>
          <p class="project-summary">{{ project.summary }}</p>
          <div class="project-stack">
            <span v-for="item in project.stack" :key="item" class="chip">{{ item }}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.list-head {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 44px;
}

.list-title {
  font-size: clamp(2.25rem, 4vw, 3rem);
}

.list-intro {
  max-width: 52ch;
  font-size: 1rem;
  color: var(--ink-2);
  line-height: 1.8;
}

.project-list {
  border-top: 1px solid var(--line);
}

.project {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-block: 30px;
  border-bottom: 1px solid var(--line);
  transition: background-color 0.2s ease;
}

.project:hover {
  background: var(--surface);
}

.project-head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.project-index {
  color: var(--accent);
}

.project-year {
  color: var(--ink-2);
}

.project-note {
  margin-left: auto;
}

.project-name {
  font-size: 1.5rem;
}

.project-summary {
  max-width: 62ch;
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--muted);
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 4px;
}
</style>
