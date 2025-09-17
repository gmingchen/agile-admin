import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '登录日志',
    value: 94,
    icon: 'log',
    permission: 'loginLog:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/log/login',
      name: 'infrastructure-log-login',
      component: '/infrastructure/log/login/index',
    },
    children: [
      { label: '查看', value: 95, permission: 'loginLog:page', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 127, permission: 'loginLog:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
