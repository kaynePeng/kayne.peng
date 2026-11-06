<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { contactLinks, focus, principles, site } from '@/data/site'
</script>

<template>
  <div class="page">
    <section class="container about">
      <div class="about-main">
        <p class="eyebrow">ABOUT</p>
        <h1 class="about-title">你好，我是 {{ site.name }}。</h1>
        <p class="about-lead">{{ site.intro }}</p>
        <p class="about-body">
          现在主要做全栈：写业务界面、搭接口和数据模型、收拾构建与部署流程，这两年也把模型能力接进了产品。喜欢把复杂的事情拆成几个能讲清楚的部分，
          也喜欢把界面做安静一点——让人先看到内容，再看到设计。
        </p>
        <p class="about-body">
          这个站点是我的公开笔记。写下来是为了把想法压缩到能被检验的程度；如果某篇恰好帮到你，那就更好了。
        </p>

        <div class="focus">
          <p class="mono">关注方向</p>
          <div class="focus-tags">
            <span v-for="item in focus" :key="item" class="chip">{{ item }}</span>
          </div>
        </div>
      </div>

      <aside class="about-side">
        <div class="panel contact">
          <p class="mono contact-head">联系</p>
          <ul class="contact-list">
            <li v-for="item in contactLinks" :key="item.label">
              <a
                :href="item.href"
                class="contact-link"
                target="_blank"
                rel="noreferrer"
              >
                <span class="contact-label">{{ item.label }}</span>
                <span class="contact-value">{{ item.value }}</span>
                <ArrowUpRight :size="14" aria-hidden="true" />
              </a>
            </li>
          </ul>
          <div class="contact-foot">
            <p class="mono">BASE</p>
            <p>{{ site.location }}</p>
          </div>
        </div>
      </aside>
    </section>

    <section class="container principles" aria-labelledby="principles-title">
      <div class="principles-head">
        <h2 id="principles-title" class="principles-title">做事的方式</h2>
        <span class="mono">3 / PRINCIPLES</span>
      </div>
      <ul class="principle-list">
        <li v-for="(item, index) in principles" :key="item.title" class="principle">
          <span class="mono principle-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="principle-title">{{ item.title }}</h3>
          <p class="principle-body">{{ item.body }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.8fr);
  gap: 64px;
  align-items: start;
}

.about-main {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.about-title {
  font-size: clamp(2rem, 3.6vw, 2.75rem);
  margin-top: 6px;
}

.about-lead {
  font-family: var(--font-display);
  font-size: 1.125rem;
  line-height: 1.85;
  color: var(--ink);
  max-width: 54ch;
}

.about-body {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: var(--ink-2);
  max-width: 58ch;
}

.focus {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.focus-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.contact {
  padding: 22px 24px;
}

.contact-head {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}

.contact-list {
  display: flex;
  flex-direction: column;
}

.contact-list li + li {
  border-top: 1px solid var(--line);
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-block: 13px;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--accent);
}

.contact-label {
  font-size: 0.8125rem;
  color: var(--muted);
  min-width: 56px;
}

.contact-value {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  color: var(--ink);
  word-break: break-all;
}

.contact-foot {
  padding-top: 14px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-foot p:last-child {
  font-size: 0.875rem;
  color: var(--ink-2);
}

.principles {
  margin-top: 88px;
}

.principles-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.principles-title {
  font-size: 1.5rem;
}

.principle-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  padding-top: 26px;
}

.principle {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.principle-index {
  color: var(--accent);
}

.principle-title {
  font-size: 1.125rem;
}

.principle-body {
  font-size: 0.875rem;
  line-height: 1.75;
  color: var(--muted);
}

@media (max-width: 900px) {
  .about {
    grid-template-columns: minmax(0, 1fr);
    gap: 36px;
  }

  .principle-list {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
}
</style>
