import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { parseStr2Date, parseData2Tree } from '@/utils'
import { MenuType } from '@/utils/enum'
import Prompt from '@/utils/prompt'
import { useMenuStore } from '../stores/modules/menu'
import { useRootStore } from '../stores/root'

let refresh = true

// 需要动态加载的组件
const dynamics = import.meta.glob('../views/modules/**/*.vue')

const constant = [
  { path: '/', redirect: { name: 'login' }, meta: { name: '重定向' } },
  { path: '/login', name: 'login', component: () => import('@/views/constant/login.vue'), meta: { title: '登录' } },
  { path: '/401', name: '401', component: () => import('@/views/constant/401.vue'), meta: { title: '401' } },
  { path: '/404', name: '404', component: () => import('@/views/constant/404.vue'), meta: { title: '404' } },
  { path: '/500', name: '500', component: () => import('@/views/constant/500.vue'), meta: { title: '500' } }
]

const main = {
  path: '/layout',
  name: 'layout',
  redirect: { name: 'redirect' },
  component: () => import('@/views/layout/index.vue'),
  meta: { title: '' },
  children: [
    // todo 动态路由未注册之前 直接跳转会报错 所以使用了个中间件
    { path: '/redirect', name: 'redirect', component: defineComponent({ render: () => h('div') }), meta: {} }
  ],
  beforeEnter: async (to, from, next) => {
    const { token, expiredAt } = useAuthStore()
    if (!token.trim() || +parseStr2Date(expiredAt) < +new Date()) {
      next({ name: 'login', replace: true })
    } else {
      if (to.name === 'redirect') {
        const exists = useMenuStore().allMenus.filter(item => item.name !== 'redirect') || []
        let name = ''
        if (exists.length) {
          name = exists[0].name
          useMenuStore().active = name
        } else {
          name = 'login'
          new Prompt().warning({
            message: '暂无可用菜单！',
            type: 'warning',
            duration: 3000
          }, true)
          useRootStore().logout()
        }
        next({ name, replace: true })
      } else {
        await useAdminerStore().getAdminer()
        next()
      }
    }
  }
}

const routes = constant.concat(main)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL || '/'),
  routes: routes
})

/**
 * 判断路由类型
 * @param {*} route
 */
function routeType(route, constantRoutes = []) {
  let temp = []
  for (let i = 0; i < constantRoutes.length; i++) {
    if (route.path === constantRoutes[i].path) {
      return 'constant'
    } else if (constantRoutes[i].children && constantRoutes[i].children.length >= 1) {
      temp = temp.concat(constantRoutes[i].children)
    }
  }
  return temp.length >= 1 ? routeType(route, temp) : 'main'
}

function formatMenus(menus) {
  const types = [MenuType.ROUTER, MenuType.MENU, MenuType.IFRAME]
  const list = menus.filter(item => types.includes(item.type) && item.url && /\S/u.test(item.url))
  return parseData2Tree(list)
}

/**
 * 递归创建路由
 * @param {*} menu
 * @returns
 */
function menu2Route(menu) {
  const { id, name, type, url, routePath, routeName, redirectName, tab, keepalive, multiple, children } = menu
  const meta = {
    id: id,
    label: name,
    type: type,
    url: url,
    dynamic: true,
    tab: tab === 1,
    keepalive: keepalive === 1,
    multiple: multiple === 1
  }
  let route
  if (type === MenuType.IFRAME) {
    route = {
      path: `/i-${ id }`,
      name: `i-${ id }`,
      component: dynamics[`../views/modules/iframe/index.vue`],
      meta
    }
  } else if (url && /\S/u.test(url)) {
    const defaultValue = url.substring(1, url.length).replace(/\//g, '-')
    route = {
      path: routePath || `/${ defaultValue }`,
      name: routeName || defaultValue,
      component: dynamics[`../views/modules${ url }.vue`],
      meta
    }
    if (type === MenuType.ROUTER && redirectName) {
      route.redirect = { name: redirectName }
    }
    if (children && children.length) {
      route.children = []
      children.forEach(item => {
        route.children.push(menu2Route(item))
      })
    }
  }
  return route
}
/**
 * 动态添加路由
 * @param {*} menus
 * @param {*} routeList
 */
function addRoutes(menus = []) {
  const list = formatMenus(menus)
  const routeList = list.map(menu => menu2Route(menu))
  if (list.length >= 1) {
    main.children = main.children.concat(routeList)
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(main.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
    router.addRoute(main)
  }
}

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  // 标题控制
  document.title = to.meta.label || to.meta.title || document.title
  // 处理动态路由页 刷新跳转 401 问题
  if (refresh) {
    // 添加 401 重定向
    router.addRoute({ path: '/:pathMatch(.*)', redirect: { name: '401' } })
  }
  // 如果跳转登录页且token未失效，则跳转首页，否则清除缓存数据
  if (to.name === 'login') {
    const { expiredAt } = useAuthStore()
    if (+parseStr2Date(expiredAt) > +new Date()) {
      next({ name: 'redirect', replace: true })
    } else {
      useRootStore().clearData()
    }
  }
  // 判断当前路由类型
  const isConstant = routeType(to, constant) === 'constant'
  if (!isConstant) {
    // 如果是动态路由
    const { load } = useMenuStore()
    if (load) {
      if (!refresh) {
        next()
        return
      }
    } else {
      const { menus } = await useMenuStore().getMenuAndPermission()
      if (!menus) {
        next()
        return
      }
    }
    refresh = false
    const { menus } = useMenuStore()
    if (!menus || menus.length === 0) {
      // useMenuStore().setLoad(false)
      // useRootStore().logout()
      // next({ name: 'login', replace: true })
      next()
    } else {
      addRoutes(menus)
      next({ ...to, replace: true })
    }
  } else {
    // 如果不是动态路由则直接跳转
    next()
  }
})

/**
 * 关闭加载条
 */
router.afterEach(() => {
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
