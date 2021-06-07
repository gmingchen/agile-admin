/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 17:23:32
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-27 16:54:53
 */
import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
import { store } from '@/store'
import I18n from '@/i18n'
import NProgress from 'nprogress'
import { isURL } from '@/utils/regular'
import { userMenusApi } from '@/api/login'
import { Menu } from 'Type/menu'

let refresh = true

/* 通用 */
const global: RouteRecordRaw[] = [
  { path: '/', redirect: { name: 'login' }, meta: { title_cn: '重定向', title_en: 'Redirect' } },
  { path: '/login', name: 'login', component: () => import('V/global/login.vue'), meta: { title_cn: '登录', title_en: 'Login' } },
  { path: '/404', name: '404', component: () => import('V/global/404.vue'), meta: { title_cn: '404', title_en: '404' } },
  { path: '/401', name: '401', component: () => import('V/global/401.vue'), meta: { title_cn: '401', title_en: '401' } }
]

/* 主入口 */
const main: RouteRecordRaw = {
  path: '/layout',
  name: 'layout',
  component: () => import('V/layout/index.vue'),
  meta: { title_cn: '主入口整体布局', title_en: 'Overall layout of main entrance' },
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('V/modules/home/index.vue'),
      meta: {
        id: 'home',
        title_cn: I18n.global.messages.cn.menu.home,
        title_en: I18n.global.messages.en.menu.home,
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
      component: () => import('V/modules/demo/index.vue'),
      meta: {
        id: 'demo',
        title_cn: I18n.global.messages.cn.menu.demo,
        title_en: I18n.global.messages.en.menu.demo,
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
      component: () => import('V/modules/set/index.vue'),
      meta: {
        id: 'set',
        title_cn: I18n.global.messages.cn.menu.set,
        title_en: I18n.global.messages.en.menu.set,
        isTab: true,
        type: 1,
        isDynamic: false,
        keepAlive: true,
        multiple: false
      }
    },
    {
      path: '/iframe',
      name: 'iframe',
      component: () => import('V/components/iframe/index.vue'),
      meta: {
        id: 'iframe',
        title_cn: 'iframe',
        title_en: 'iframe',
        isTab: true,
        type: 1,
        isDynamic: false,
        keepAlive: true,
        multiple: true
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

const routes: RouteRecordRaw[] = global.concat(main)

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
function currentRouteType(route: RouteLocationNormalizedLoaded, commonRoutes: RouteRecordRaw[] = []): string {
  let temp: RouteRecordRaw[] = []
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
function addRoutes(menus: Menu.Vo[] = [], routeList: RouteRecordRaw[] = []): void {
  let list: Menu.Vo[] = []
  menus.forEach((item: Menu.Vo, _index: number) => {
    if (item.children && item.children.length > 0) {
      list = list.concat(item.children)
    }
    if (item.url && /\S/u.test(item.url)) {
      const route: RouteRecordRaw = {
        path: '/' + item.url.replace(/\//g, '-'),
        name: item.url.replace(/\//g, '-'),
        component: () => import(`V/modules/${ item.url }.vue`) || null,
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
        route['component'] = () => import(`V/components/iframe/index.vue`)
        route['meta']!['iframeUrl'] = item.url
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

router.beforeEach(async (to: RouteLocationNormalizedLoaded, _from, next) => {
  // 标题控制
  document.title = to.meta[`title_${ store.getters['setting/language'] }`] as string || document.title
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
    const menus: Menu.Vo[] = store.getters['menu/menus']
    addRoutes(menus)
    next({ ...to, replace: true })
  }
})

router.afterEach((_to, _from) => {
  NProgress.done()
})

export default router
