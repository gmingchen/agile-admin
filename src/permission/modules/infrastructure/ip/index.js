import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: 'IP地址',
    value: 144,
    icon: 'maximize',
    permission: 'ip:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/ip',
      name: 'infrastructure-ip',
      component: '/infrastructure/ip/index',
    },
    children: [
      { label: '查看', value: 145, permission: 'ip:page', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 146, permission: 'ip:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
