import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '在线管理员',
    value: 152,
    icon: 'user-volume',
    permission: 'online:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/online',
      name: 'infrastructure-online',
      component: '/infrastructure/online/index',
    },
    children: [
      { label: '查看', value: 153, permission: 'online:page', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '强制退出', value: 154, permission: 'online:logout', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
