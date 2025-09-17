import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '异常日志',
    value: 96,
    icon: 'log',
    permission: 'errorLog:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/log/error',
      name: 'infrastructure-log-error',
      component: '/infrastructure/log/error/index',
    },
    children: [
      { label: '查看', value: 97, permission: 'errorLog:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 135, permission: 'errorLog:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
