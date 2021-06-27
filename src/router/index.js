/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 17:23:32
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-27 16:54:53
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import { isURL } from '@/utils/regular'
import { userMenusApi } from '@/api/login'

let refresh = true

/* 通用 */
const global = [
  { path: '/', redirect: { name: 'login' }, meta: { title_cn: '重定向', title_en: 'Redirect' } },
  { path: '/login', name: 'login', component: () => import('@/views/global/login.vue'), meta: { title_cn: '登录', title_en: 'Login' } },
  { path: '/404', name: '404', component: () => import('@/views/global/404.vue'), meta: { title_cn: '404', title_en: '404' } },
  { path: '/401', name: '401', component: () => import('@/views/global/401.vue'), meta: { title_cn: '401', title_en: '401' } }
]

/* 主入口 */
const main = {
  path: '/layout',
  name: 'layout',
  component: () => import('@/views/layout/index.vue'),
  meta: { title_cn: '主入口整体布局', title_en: 'Overall layout of main entrance' },
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/modules/home/index.vue'),
      meta: {
        id: 'home',
        title_cn: '首页',
        title_en: '',
        isTab: true,
        type: 1,
        isDynamic: false,
        keepAlive: true,
        multiple: false
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/modules/demo/index.vue'),
      meta: {
        id: 'demo',
        title_cn: 'Demo',
        title_en: '',
        isTab: true,
        type: 1,
        isDynamic: false,
        keepAlive: true,
        multiple: true
      }
    },
    {
      path: '/set',
      name: 'set',
      component: () => import('@/views/modules/set/index.vue'),
      meta: {
        id: 'set',
        title_cn: '设置',
        title_en: '',
        isTab: true,
        type: 1,
        isDynamic: false,
        keepAlive: true,
        multiple: false
      }
    }
  ],
  beforeEnter(_to, _from, next) {
    const token = store.getters['user/tokenVal']
    if (!token || !/\S/u.test(token)) {
      next({ name: 'login', replace: true })
    } else {
      next()
    }
  }
}

const routes = global.concat(main)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * @description: 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {RouteLocationNormalized} route
 * @param {Array} commonRoutes
 * @return {*}
 * @author: gumingchen
 */
function currentRouteType(route, commonRoutes = []) {
  let temp = []
  for (let i = 0; i < commonRoutes.length; i++) {
    if (route.path === commonRoutes[i].path) {
      return 'global'
    } else if (commonRoutes[i].children && commonRoutes[i].children.length >= 1) {
      temp = temp.concat(commonRoutes[i].children)
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
function addRoutes(menus = [], routeList = []) {
  let list = []
  menus.forEach((item, _index) => {
    if (item.children && item.children.length > 0) {
      list = list.concat(item.children)
    }
    if (item.url && /\S/u.test(item.url)) {
      const route = {
        path: '/' + item.url.replace(/\//g, '-'),
        name: item.url.replace(/\//g, '-'),
        component: () => import(`@/views/modules/${ item.url }.vue`) || null,
        meta: {
          id: item.id,
          title_cn: item.name_cn,
          title_en: item.name_en,
          isDynamic: true,
          isTab: item.is_tab === 1,
          type: item.type,
          keepAlive: item.is_alive === 1,
          multiple: item.is_multiple === 1
        }
      }
      if (isURL(item.url)) {
        route['path'] = `/i-${ item.id }`
        route['name'] = `i-${ item.id }`
        route['component'] = () => import(`@/views/modules/iframe/index.vue`)
        route['meta']['iframeUrl'] = item.url
      }
      routeList.push(route)
    }
  })
  if (list.length >= 1) {
    addRoutes(list, routeList)
  } else {
    main.children = main.children.concat(routeList)
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(main.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
    router.addRoute(main)
  }
}

router.beforeEach(async (to, _from, next) => {
  // 标题控制
  document.title = to.meta.title_cn || document.title
  // 跳转到登录页清除所有信息
  if (to.name === 'login') {
    store.dispatch('setting/exit')
  }
  NProgress.start()
  // 处理动态路由页 刷新跳转 404 问题
  if (refresh) {
    // 添加 404 重定向
    router.addRoute({ path: '/:pathMatch(.*)', redirect: { name: '404' } })
  }
  // todo: 动态添加路由
  const isGlobal = currentRouteType(to, global) === 'global'
  if (isGlobal) {
    next()
  } else {
    const isGet = store.getters['menu/isGet']
    if (isGet) {
      if (!refresh) {
        next()
        return
      }
    } else {
      const r = await userMenusApi()
      if (r) {
        store.dispatch('menu/setMenuAndPermission', r.data)
      } else {
        next()
        return
      }
    }
    refresh = false
    const menus = store.getters['menu/menus']
    addRoutes(menus)
    next({ ...to, replace: true })
  }
})

router.afterEach((_to, _from) => {
  NProgress.done()
})

export default router
