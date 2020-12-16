import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/index.vue'

const detached: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'login' }, meta: { title: '重定向' }},
  { path: '/404', name: '404', component: () => import('@/views/detached/404'), meta: { title: '404' }},
  { path: '/401', name: '401', component: () => import('@/views/detached/401'), meta: { title: '401' }},
  { path: '/login', name: 'login', component: () => import('@/views/detached/login'), meta: { title: '登录' }}
]
console.log(detached)
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

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
