import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const global: RouteRecordRaw[] = [
  { path: '/404', name: '404', component: () => import('V/global/404.vue'), meta: { title_cn: '404', title_en: '404' } },
  { path: '/401', name: '401', component: () => import('V/global/401.vue'), meta: { title_cn: '401', title_en: '401' } }
]

const routes: RouteRecordRaw[] = global

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
