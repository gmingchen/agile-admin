import { createRouter, createWebHashHistory } from 'vue-router'

const common = [
  { path: '/', redirect: { name: 'login' }, meta: { title_cn: '重定向', title_en: 'Redirect' } },
  { path: '/login', name: 'login', component: () => import('@/views/common/login.vue'), meta: { title_cn: '登录', title_en: 'Login' } }
]

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
    }
  ]
}

const routes = common.concat(main)

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL || '/'),
  routes
})

export default router
