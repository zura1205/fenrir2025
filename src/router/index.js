import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue'),
    meta: { title: 'Home', desc: '検索システム' }
  },
  {
    path: '/results/:range',
    name: 'Search',
    component: () => import( '../pages/search.vue'),
    meta: { title: '検索結果', desc: '検索システム' }
  },
  {
    path: '/results/shop/:id',
    name: 'Shop',
    component: () => import( '../pages/shop.vue'),
    meta: { title: '店舗情報', desc: '検索システム' }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router