export const constants = [
  { path: '/', redirect: { name: 'login' }, meta: { name: '重定向' } },
  { path: '/login', name: 'login', component: () => import('@/views/constants/login/index.vue'), meta: { label: '登录' } },
  { path: '/401', name: '401', component: () => import('@/views/constants/401/index.vue'), meta: { label: '401' } },
  { path: '/404', name: '404', component: () => import('@/views/constants/404/index.vue'), meta: { label: '404' } },
  { path: '/500', name: '500', component: () => import('@/views/constants/500/index.vue'), meta: { label: '500' } }
]

export const layout = {
  path: '/layout',
  name: 'layout',
  redirect: { name: 'redirect' },
  component: () => import('@/views/layout/index.vue'),
  children: [
    { path: '/redirect', name: 'redirect', component: defineComponent({ render: () => h('div') }), meta: {} },
  ]
}
