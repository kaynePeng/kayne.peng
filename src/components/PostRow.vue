<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import { formatDate, type PostMeta } from '@/lib/posts'

defineProps<{
  post: PostMeta
  index?: number
}>()
</script>

<template>
  <RouterLink :to="`/writing/${post.slug}`" class="post-row">
    <span class="post-index">{{ String(index ?? post.order).padStart(2, '0') }}</span>
    <span class="post-main">
      <span class="post-title">{{ post.title }}</span>
      <span class="post-summary">{{ post.summary }}</span>
      <span class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </span>
    </span>
    <span class="post-meta">
      <span class="mono">{{ formatDate(post.date) }}</span>
      <span class="mono">{{ post.readingTime }} min</span>
    </span>
    <ArrowUpRight :size="15" class="post-arrow" aria-hidden="true" />
  </RouterLink>
</template>

<style scoped>
.post-row {
  display: grid;
  grid-template-columns: 48px 1fr auto 24px;
  align-items: start;
  gap: 16px;
  padding-block: 22px;
  border-top: 1px solid var(--line);
  transition: background-color 0.2s ease;
}

.post-row:hover {
  background: var(--surface);
}

.post-row:hover .post-title {
  color: var(--accent);
}

.post-row:hover .post-arrow {
  color: var(--accent);
  transform: translate(2px, -2px);
}

.post-index {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
  padding-top: 4px;
  letter-spacing: 0.06em;
}

.post-main {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.post-title {
  font-family: var(--font-display);
  font-size: 1.375rem;
  line-height: 1.3;
  color: var(--ink);
  transition: color 0.2s ease;
}

.post-summary {
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.6;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
}

.post-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-align: right;
  padding-top: 5px;
  white-space: nowrap;
}

.post-arrow {
  color: var(--line-strong);
  padding-top: 6px;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

@media (max-width: 720px) {
  .post-row {
    grid-template-columns: 32px 1fr 18px;
    gap: 10px;
  }

  .post-meta {
    display: none;
  }

  .post-title {
    font-size: 1.125rem;
  }
}
</style>
