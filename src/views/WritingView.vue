<script setup lang="ts">
import { computed } from 'vue'
import PostRow from '@/components/PostRow.vue'
import { allPosts, yearOf } from '@/lib/posts'

const groups = computed(() => {
  const map = new Map<string, typeof allPosts>()
  for (const post of allPosts) {
    const year = yearOf(post.date)
    const list = map.get(year) ?? []
    list.push(post)
    map.set(year, list)
  }
  return Array.from(map.entries()).map(([year, posts]) => ({ year, posts }))
})
</script>

<template>
  <div class="page">
    <section class="container list-head">
      <p class="eyebrow">WRITING</p>
      <h1 class="list-title">文章</h1>
      <p class="list-intro">
        关于全栈工程、类型与界面的笔记，也写模型被接进产品之后的事。多是实际踩过的坑，写完顺便留档。
      </p>
      <p class="mono list-count">{{ allPosts.length }} 篇 · 按时间倒序</p>
    </section>

    <section
      v-for="group in groups"
      :key="group.year"
      class="container group"
      :aria-label="`${group.year} 年`"
    >
      <div class="group-head">
        <span class="group-year">{{ group.year }}</span>
        <span class="group-rule" aria-hidden="true"></span>
        <span class="mono">{{ group.posts.length }}</span>
      </div>
      <div class="group-list">
        <PostRow v-for="post in group.posts" :key="post.slug" :post="post" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.list-head {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 48px;
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

.list-count {
  margin-top: 6px;
  letter-spacing: 0.1em;
}

.group {
  margin-bottom: 44px;
}

.group-head {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 12px;
}

.group-year {
  font-family: var(--font-display);
  font-size: 1.125rem;
  color: var(--ink);
}

.group-rule {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.group-list {
  border-bottom: 1px solid var(--line);
}
</style>
