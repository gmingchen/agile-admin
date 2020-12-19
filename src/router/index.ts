import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/* 通用 */
const currency: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'login' }, meta: { title: '重定向' }},
  { path: '/home', name: 'home', component: () => import('@/views/index.vue'), meta: { title: 'home' }},
  { path: '/404', name: '404', component: () => import('@/views/currency/404.vue'), meta: { title: '404' }},
  { path: '/401', name: '401', component: () => import('@/views/currency/401.vue'), meta: { title: '401' }},
  { path: '/login', name: 'login', component: () => import('@/views/currency/login.vue'), meta: { title: '登录' }}
]
/* 主入口 */
const main: RouteRecordRaw = {
  path: '/main',
  name: 'main',
  component: () => import('@/views/main/index.vue'),
  meta: { title: '主入口整体布局' },
  children: []
}
/* 我的桌面 */
const desktop: RouteRecordRaw = {
  path: '/desktop',
  name: 'desktop',
  component: () => import('@/views/modules/desktop/index.vue'),
  meta: { title: '我的桌面整体布局' },
  children: [
    // { path: '/desktop/home', name: '/desktop/home', component: () => import('@/views/modules/desktop/home/index'), meta: { title: '首页' }}
  ]
}
/* 其他页面 */
const other: RouteRecordRaw = {
  path: '/',
  name: '',
  component: () => import('@/views/modules/other/index.vue'),
  meta: { title: '其他菜单整体布局' },
  children: [
    // { path: '/other/system-management/data-model-customization', name: '/other/system-management/data-model-customization', component: () => import('@/views/modules/other/system-management/data-model-customization/index'), meta: { title: '菜单管理' }}
  ]
}

main.children?.push(desktop, other)

const routes: Array<RouteRecordRaw> = currency.concat(main)

console.log('routes', routes)

// const history = createWebHistory(process.env.BASE_URL) // history
const history = createWebHashHistory() // hash

const router = createRouter({
  history: history,
  routes
})

router.beforeEach((to, from, next) => {
  // NProgress.start()
  next()
})
router.afterEach(() => {
  // NProgress.done()
})

export default router
