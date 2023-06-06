import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { parseStr2Date } from '@/utils'
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
  meta: { title: '主入口整体布局' },
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

/**
 * 动态添加路由
 * @param {*} menus
 * @param {*} routeList
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
          path: `/i-${ item.id }`,
          name: `i-${ item.id }`,
          component: dynamics[`../views/modules/iframe/index.vue`],
          meta: {
            id: item.id,
            title: item.name,
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
          const defaultValue = item.url.substring(1, item.url.length).replace(/\//g, '-')
          route = {
            path: item.routePath || `/${ defaultValue }`,
            name: item.routeName || defaultValue,
            component: dynamics[`../views/modules${ item.url }.vue`],
            meta: {
              id: item.id,
              label: item.name,
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

router.beforeEach(async (to, _from, next) => {
  console.log(to)
  // debugger
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
