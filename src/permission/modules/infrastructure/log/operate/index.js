import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '操作日志',
    value: 92,
    icon: 'log',
    permission: 'operateLog:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/log/operate',
      name: 'infrastructure-log-operate',
      component: '/infrastructure/log/operate/index',
    },
    children: [
      { label: '查看', value: 93, permission: 'operateLog:page', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 134, permission: 'operateLog:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
