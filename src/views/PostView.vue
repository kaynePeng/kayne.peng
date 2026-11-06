<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-vue-next'
import { formatDate, getPost, relatedPosts, renderMarkdown } from '@/lib/posts'

const route = useRoute()

const post = computed(() => getPost(String(route.params.slug ?? '')))
const html = ref('')
const next = computed(() => relatedPosts(String(route.params.slug ?? ''), 1))

watch(
  () => post.value?.slug,
  async (slug) => {
    const current = post.value
    if (!slug || !current) {
      html.value = ''
      return
    }
    const rendered = await renderMarkdown(current.body)
    // 切换文章的过程中可能有更晚的结果，落地前确认还是同一篇
    if (post.value?.slug === slug) html.value = rendered
  },
  { immediate: true },
)
</script>

<template>
  <div class="page">
    <article v-if="post" class="container article">
      <RouterLink to="/writing" class="back">
        <ArrowLeft :size="14" aria-hidden="true" />
        返回文章列表
      </RouterLink>

      <header class="article-head">
        <p class="mono article-index">INDEX {{ String(post.order).padStart(2, '0') }}</p>
        <h1 class="article-title">{{ post.title }}</h1>
        <p class="article-summary">{{ post.summary }}</p>
        <div class="article-meta">
          <span class="mono">{{ formatDate(post.date) }}</span>
          <span class="meta-dot" aria-hidden="true"></span>
          <span class="mono">约 {{ post.readingTime }} 分钟</span>
          <span class="meta-dot" aria-hidden="true"></span>
          <span class="article-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </span>
        </div>
      </header>

      <div class="prose" v-html="html"></div>

      <footer class="article-foot">
        <RouterLink to="/writing" class="link-arrow">
          继续读别的
          <ArrowUpRight :size="15" aria-hidden="true" />
        </RouterLink>
        <div v-if="next.length" class="next">
          <p class="mono">下一篇</p>
          <RouterLink :to="`/writing/${next[0]?.slug}`" class="next-link">
            {{ next[0]?.title }}
          </RouterLink>
        </div>
      </footer>
    </article>

    <div v-else class="container missing">
      <p class="mono">404</p>
      <h1 class="missing-title">这篇文章不存在，或者还没写。</h1>
      <RouterLink to="/writing" class="link-arrow">回到文章列表</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.article {
  max-width: 760px;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  color: var(--muted);
  transition: color 0.2s ease;
}

.back:hover {
  color: var(--accent);
}

.article-head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-block: 32px 36px;
}

.article-index {
  color: var(--accent);
  letter-spacing: 0.18em;
}

.article-title {
  font-size: clamp(1.875rem, 3.6vw, 2.75rem);
  line-height: 1.22;
}

.article-summary {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--muted);
  max-width: 58ch;
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid var(--line);
}

.meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--line-strong);
}

.article-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.article-foot {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.next {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
}

.next-link {
  font-family: var(--font-display);
  font-size: 1.0625rem;
  color: var(--ink);
  transition: color 0.2s ease;
}

.next-link:hover {
  color: var(--accent);
}

.missing {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.missing-title {
  font-size: 1.75rem;
}
</style>
