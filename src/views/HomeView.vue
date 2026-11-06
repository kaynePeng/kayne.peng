<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import PostRow from '@/components/PostRow.vue'
import { allPosts } from '@/lib/posts'
import { focus, now, projects, site } from '@/data/site'

const latest = allPosts.slice(0, 3)
const selected = projects.slice(0, 2)
</script>

<template>
  <div class="page">
    <section class="container hero">
      <div class="hero-main">
        <p class="eyebrow">{{ site.location }} · {{ site.handle }}</p>
        <h1 class="hero-title">
          <span>写代码，</span>
          <span class="hero-title-accent">也写下为什么。</span>
        </h1>
        <p class="hero-intro">{{ site.intro }}</p>
        <div class="hero-actions">
          <RouterLink to="/writing" class="link-arrow">
            读最新的文章
            <ArrowRight :size="15" aria-hidden="true" />
          </RouterLink>
          <RouterLink to="/about" class="link-arrow">
            关于我
            <ArrowRight :size="15" aria-hidden="true" />
          </RouterLink>
        </div>
      </div>

      <aside class="now panel" aria-label="当前状态">
        <div class="now-head">
          <span class="mono">当前</span>
          <span class="now-dot" aria-hidden="true"></span>
        </div>
        <dl class="now-list">
          <div v-for="item in now" :key="item.k" class="now-item">
            <dt class="mono">{{ item.k }}</dt>
            <dd>{{ item.v }}</dd>
          </div>
        </dl>
        <div class="now-foot">
          <span class="mono">FOCUS</span>
          <p>{{ focus.join(' / ') }}</p>
        </div>
      </aside>
    </section>

    <section class="container block" aria-labelledby="latest-title">
      <div class="block-head">
        <h2 id="latest-title" class="block-title">最近写的</h2>
        <RouterLink to="/writing" class="block-more">
          全部文章 {{ allPosts.length }} 篇
          <ArrowRight :size="14" aria-hidden="true" />
        </RouterLink>
      </div>
      <div class="post-list">
        <PostRow v-for="post in latest" :key="post.slug" :post="post" />
      </div>
    </section>

    <section class="container block" aria-labelledby="work-title">
      <div class="block-head">
        <h2 id="work-title" class="block-title">在做的事</h2>
        <RouterLink to="/projects" class="block-more">
          全部项目
          <ArrowRight :size="14" aria-hidden="true" />
        </RouterLink>
      </div>
      <ul class="work-list">
        <li v-for="project in selected" :key="project.name" class="work-item">
          <span class="mono work-year">{{ project.year }}</span>
          <div class="work-body">
            <p class="work-name">{{ project.name }}</p>
            <p class="work-summary">{{ project.summary }}</p>
          </div>
          <span class="mono work-note">{{ project.note }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
  gap: 64px;
  align-items: start;
  padding-bottom: 12px;
}

.hero-main {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.hero-title {
  font-size: clamp(2.5rem, 5.6vw, 4.25rem);
  line-height: 1.14;
  letter-spacing: -0.02em;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hero-title-accent {
  color: var(--accent);
  font-style: italic;
}

.hero-intro {
  max-width: 42ch;
  font-size: 1.0625rem;
  line-height: 1.85;
  color: var(--ink-2);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  padding-top: 6px;
}

.now {
  padding: 22px 24px 20px;
}

.now-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.now-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
}

.now-list {
  margin: 0;
}

.now-item {
  padding-block: 14px;
  border-bottom: 1px solid var(--line);
}

.now-item dt {
  margin-bottom: 4px;
}

.now-item dd {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--ink);
}

.now-foot {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.now-foot p {
  font-size: 0.8125rem;
  color: var(--muted);
  line-height: 1.7;
}

.block {
  margin-top: 88px;
}

.block-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 14px;
}

.block-title {
  font-size: 1.5rem;
}

.block-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: var(--muted);
  transition: color 0.2s ease;
}

.block-more:hover {
  color: var(--accent);
}

.post-list {
  border-bottom: 1px solid var(--line);
}

.work-list {
  border-top: 1px solid var(--line);
}

.work-item {
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 20px;
  align-items: baseline;
  padding-block: 22px;
  border-bottom: 1px solid var(--line);
  transition: background-color 0.2s ease;
}

.work-item:hover {
  background: var(--surface);
}

.work-year {
  color: var(--muted);
}

.work-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.work-summary {
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.65;
  max-width: 62ch;
}

.work-note {
  white-space: nowrap;
}
</style>
