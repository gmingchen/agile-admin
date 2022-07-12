import { createRouter, createWebHashHistory } from 'vue-router'
import { defineComponent, h } from 'vue'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { parseStr2Date } from '@/utils'

let refresh = true

const constant = [
  { path: '/', redirect: { name: 'login' }, meta: { title_cn: '重定向', title_en: 'Redirect' } },
  { path: '/login', name: 'login', component: () => import('@/views/constant/login.vue'), meta: { title_cn: '登录', title_en: 'Login' } },
  { path: '/401', name: '401', component: () => import('@/views/constant/401.vue'), meta: { title_cn: '401', title_en: '401' } },
  { path: '/404', name: '404', component: () => import('@/views/constant/404.vue'), meta: { title_cn: '404', title_en: '404' } },
  { path: '/500', name: '500', component: () => import('@/views/constant/500.vue'), meta: { title_cn: '500', title_en: '500' } }
]

const main = {
  path: '/layout',
  name: 'layout',
  component: () => import('@/views/layout/index.vue'),
  meta: { title_cn: '主入口整体布局', title_en: 'Overall layout of main entrance' },
  children: [
    // todo 动态路由未注册之前 直接 push 会报错 所以使用了个中间件
    { path: '/redirect', name: 'redirect', component: defineComponent({ render: () => h('div') }), meta: {} }
  ],
  async beforeEnter(to, _from, next) {
    const token = store.getters['administrator/tokenVal']
    if (!token || !/\S/u.test(token)) {
      // eslint-disable-next-line no-use-before-define
      clearRouter()
      store.dispatch('logout')
      next({ name: 'login', replace: true })
    } else {
      await store.dispatch('administrator/getAdministrator')
      await store.dispatch('enterprise/getEnterprise')
      if (to.name === 'redirect') {
        const exists = main.children.filter(item => item.name !== 'redirect') || []
        const name = exists.length ? exists[0].name : '404'
        store.dispatch('menu/setActive', name)
        next({ name, replace: true })
      } else {
        next()
      }
    }
  }
}

const routes = constant.concat(main)

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL || '/'),
  routes
})

/**
 * @description: 判断当前路由类型, constant: 常量路由, main: 主入口路由
 * @param {RouteLocationNormalized} route
 * @param {Array} constantRoutes
 * @return {*}
 * @author: gumingchen
 */
function currentRouteType(route, constantRoutes = []) {
  let temp = []
  for (let i = 0; i < constantRoutes.length; i++) {
    if (route.path === constantRoutes[i].path) {
      return 'constant'
    } else if (constantRoutes[i].children && constantRoutes[i].children.length >= 1) {
      temp = temp.concat(constantRoutes[i].children)
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
    let route
    switch (item.type) {
      case 3:
        route = {
          path: `/i-${ item.menu_id }`,
          name: `i-${ item.menu_id }`,
          component: () => import(`@/views/modules/iframe/index.vue`),
          meta: {
            id: item.menu_id,
            title_cn: item.name_cn,
            title_en: item.name_en,
            type: item.type,
            url: item.url,
            dynamic: true,
            tab: item.tab === 1,
            keepalive: item.keepalive === 1,
            multiple: item.multiple === 1
          }
        }
        break
      case 0:
        break
      case 4:
        break
      default:
        if (item.url && /\S/u.test(item.url)) {
          route = {
            path: item.path || `/${ item.url.replace(/\//g, '-') }`,
            name: item.name || item.url.replace(/\//g, '-'),
            component: () => import(`@/views/modules/${ item.url }.vue`) || null,
            meta: {
              id: item.menu_id,
              title_cn: item.name_cn,
              title_en: item.name_en,
              type: item.type,
              url: item.url,
              dynamic: true,
              tab: item.tab === 1,
              keepalive: item.keepalive === 1,
              multiple: item.multiple === 1
            }
          }
        }
        break
    }
    if (route) {
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

/**
 * @description: 清除动态添加的路由
 * @param {Array} menus
 * @param {Array} routeList
 * @return {*}
 * @author: gumingchen
 */
function clearRouter() {
  const routers = router.getRoutes().filter(item => item.meta.isDynamic)
  routers.forEach(item => {
    router.removeRoute(item.name)
  })
  // 其实只要这一行就可以
  main.children = main.children.filter(item => !item.meta.dynamic)
}

router.beforeEach(async (to, _from, next) => {
  // 标题控制
  document.title = to.meta.title_cn || document.title
  // 跳转到登录页如果 token 还未过期则调整到系统内部
  if (to.name === 'login') {
    const { expired_at } = store.state.administrator.token
    const now = +new Date()
    const expired = expired_at ? +parseStr2Date(expired_at) : 0
    if (expired > now) {
      next({ name: 'redirect', replace: true })
    }
  }
  NProgress.start()
  // 处理动态路由页 刷新跳转 401 问题
  if (refresh) {
    // 添加 401 重定向
    router.addRoute({ path: '/:pathMatch(.*)', redirect: { name: '401' } })
  }
  // todo: 动态添加路由
  const isCommon = currentRouteType(to, constant) === 'constant'
  if (isCommon) {
    next()
  } else {
    const isGet = store.state['menu'].get
    if (isGet) {
      if (!refresh) {
        next()
        return
      }
    } else {
      const menus = await store.dispatch('menu/getMenuAndPermission')
      if (!menus) {
        next()
        return
      }
    }
    refresh = false
    const menus = store.state.menu.menus
    if (!menus || menus.length === 0) {
      store.dispatch('menu/setGet', false)
      next({ name: '404', replace: true })
    } else {
      addRoutes(menus)
      next({ ...to, replace: true })
    }
  }
})

router.afterEach((_to, _from) => {
  NProgress.done()
})

// 添加异常处理
const originalPush = router.push
router.push = (to) => {
  try {
    return originalPush(to)
  } catch (error) {
    window.console.log(`%c${ error }`, 'color:red')
    return originalPush({ name: '404' })
  }
}

export default router
