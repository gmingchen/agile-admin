/*
 * @Description: 路由
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-15 08:45:46
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-22 16:14:18
 */
import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { getIsGet, setAuth, setIsGet } from '@U/auth'
import { getUserMenus } from '@API/common/index'
import { getToken } from '@U/token'
import { $clearLoginInfo } from '@U/.'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { IMenu } from '@/store/modules/auth/index.type'
import { isURL } from '@U/regular'
import store from '@/store'

setIsGet(false)

/* 通用 */
const global: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'login' }, meta: { title: '重定向' } },
  { path: '/login', name: 'login', component: () => import('@/views/common/login.vue'), meta: { title: '登录' } },
  { path: '/404', name: '404', component: () => import('@/views/common/404.vue'), meta: { title: '404' } },
  { path: '/401', name: '401', component: () => import('@/views/common/401.vue'), meta: { title: '401' } }
]

/* 主入口 */
const main: RouteRecordRaw = {
  path: '/',
  name: 'main',
  component: () => import('@/views/layout/index.vue'),
  meta: { title: '主入口整体布局' },
  children: [
    { path: '/home', name: 'home', component: () => import('@/views/modules/home/index.vue'), meta: { title: '首页', isTab: true } },
    { path: '/example', name: 'example', component: () => import('@/views/modules/example/index.vue'), meta: { title: 'demo', isTab: true } }
  ],
  beforeEnter(_to, _from, next) {
    const token = getToken()
    if (!token || !/\S/u.test(token)) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
}

const routes: Array<RouteRecordRaw> = global.concat(main)

// const history = createWebHistory(process.env.BASE_URL) // history
const history = createWebHashHistory() // hash

const router = createRouter({
  history: history,
  routes
})

/**
 * @description: 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {RouteLocationNormalized} route
 * @param {Array} commonRoutes
 * @return {*}
 * @author: gumingchen
 */
function currentRouteType(route: RouteLocationNormalized, commonRoutes: Array<RouteRecordRaw> = []): string {
  let temp: Array<RouteRecordRaw> = []
  for (let i = 0; i < commonRoutes.length; i++) {
    if (route.path === commonRoutes[i].path) {
      return 'global'
    } else if (commonRoutes[i].children && commonRoutes[i].children!.length >= 1) { // eslint-disable-line
      temp = temp.concat(commonRoutes[i].children!) // eslint-disable-line
    }
  }
  return temp.length >= 1 ? currentRouteType(route, temp) : 'main'
}

/**
 * @description: 动态添加路由
 * @param {Array} menus
 * @param {Array} routeList
 * @return {*}
 * @author: gumingchen
 */
function addRoutes(menus: Array<IMenu> = [], routeList: Array<RouteRecordRaw> = []): void {
  let list: Array<IMenu> = []
  menus.forEach((item: IMenu, index: number) => {
    if (item.list && item.list.length > 0) {
      list = list.concat(item.list)
    }
    if (item.url && /\S/u.test(item.url)) {
      const route: RouteRecordRaw = {
        path: '/' + item.url.replace(/\//gu, '-'),
        name: item.url.replace(/\//gu, '-'),
        component: () => import(`@/views/modules/${item.url}.vue`) || null,
        meta: {
          id: item.id,
          title: item.name,
          isDynamic: true,
          isTab: item.tab,
          iframeUrl: '',
          type: item.type
        }
      }
      if (isURL(item.url)) {
        route['path'] = `i-${item.id}`
        route['name'] = `i-${item.id}`
        route['meta']!['iframeUrl'] = item.url // eslint-disable-line
      }
      routeList.push(route)
    }
  })
  if (list.length >= 1) {
    addRoutes(list, routeList)
  } else {
    main.children = main.children!.concat(routeList) // eslint-disable-line
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(main.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
    router.addRoute(main)
  }
}

router.beforeEach(async (to: RouteLocationNormalized, _from, next) => {
  NProgress.start()
  if (to.name === 'login') {
    $clearLoginInfo()
  }
  if (currentRouteType(to, global) === 'global' || getIsGet()) {
    next()
  } else {
    const r = await getUserMenus()
    if (r && r.code === 0) {
      setAuth(r.menuList, r.permissions)
      setIsGet(true)
      addRoutes(r.menuList)
      store.dispatch('auth/setAuth')
      next({ ...to, replace: true })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
export default router
