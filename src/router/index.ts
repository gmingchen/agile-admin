import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const global: RouteRecordRaw[] = [
  { path: '/', redirect: { name: 'login' }, meta: { title_cn: '重定向', title_en: 'Redirect' } },
  { path: '/404', name: '404', component: () => import('V/global/404.vue'), meta: { title_cn: '404', title_en: '404' } },
  { path: '/401', name: '401', component: () => import('V/global/401.vue'), meta: { title_cn: '401', title_en: '401' } },
  { path: '/login', name: 'login', component: () => import('V/global/login.vue'), meta: { title_cn: '登录', title_en: 'Login' } }
]

const routes: RouteRecordRaw[] = global

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
