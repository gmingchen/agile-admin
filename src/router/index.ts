/*
 * @Description: 路由
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-15 08:45:46
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-07 16:08:49
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/* 通用 */
const common: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'login' }, meta: { title: '重定向' } },
  { path: '/login', name: 'login', component: () => import('@/views/common/login.vue'), meta: { title: '登录' } },
  { path: '/404', name: '404', component: () => import('@/views/common/404.vue'), meta: { title: '404' } },
  { path: '/401', name: '401', component: () => import('@/views/common/401.vue'), meta: { title: '401' } }
]

/* 主入口 */
const main: RouteRecordRaw = {
  path: '/layout',
  name: 'layout',
  component: () => import('@/views/layout/index.vue'),
  meta: { title: '主入口整体布局' },
  children: [
    { path: '/home', name: 'home', component: () => import('@/views/modules/home/index.vue'), meta: { title: 'home' } },
    { path: '/example', name: 'example', component: () => import('@/views/modules/example/index.vue'), meta: { title: 'example' } }
  ]
}

const routes: Array<RouteRecordRaw> = common.concat(main)

console.log('routes', routes)

// const history = createWebHistory(process.env.BASE_URL) // history
const history = createWebHashHistory() // hash

const router = createRouter({
  history: history,
  routes
})

router.beforeEach((_to, _from, next) => {
  // NProgress.start()
  next()
})
router.afterEach(() => {
  // NProgress.done()
})

export default router
