import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '代码生成器',
    value: 34,
    icon: 'code',
    permission: 'generator:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/generator',
      name: 'infrastructure-generator',
      component: '/infrastructure/generator/index',
    },
    children: [
      { label: '查看', value: 35, permission: 'generator:page', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '生成', value: 36, permission: 'generator:generate', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
