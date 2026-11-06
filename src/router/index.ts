import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { site } from '@/data/site'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { code: 'INDEX', title: '首页' },
    },
    {
      path: '/writing',
      name: 'writing',
      component: () => import('../views/WritingView.vue'),
      meta: { code: 'WRITING', title: '文章' },
    },
    {
      path: '/writing/:slug',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      meta: { code: 'POST', title: '文章' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: { code: 'WORK', title: '项目' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { code: 'ABOUT', title: '关于' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/PostView.vue'),
      meta: { code: '404', title: '未找到' },
    },
  ],
})

router.afterEach((to) => {
  const title = to.meta.title
  document.title = typeof title === 'string' ? `${title} · ${site.name}` : site.name
})

export default router
