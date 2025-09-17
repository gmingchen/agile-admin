import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '首页',
    value: 1,
    icon: 'home',
    permission: 'page:home',
    keepalive: true,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/home',
      name: 'home',
      component: '/home/index'
    },
  },
]
