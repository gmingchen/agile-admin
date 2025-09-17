import { createRouter, createWebHistory } from 'vue-router'
import { constants, layout } from './route'
import { beforeEachHandler, afterEachHandler } from './interceptor'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ ...constants, layout ]
})

router.beforeEach((to, from, next) => beforeEachHandler(to, from, next, router))
router.afterEach((to, from, failure) => afterEachHandler(to, from, failure, router))

export default router
