import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '区域管理',
    value: 117,
    icon: 'region',
    permission: 'region:list',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/region',
      name: 'infrastructure-develop-region',
      component: '/infrastructure/develop/region/index',
    },
    children: [
      { label: '查看', value: 118, permission: 'region:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 119, permission: 'region:create,region:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 120, permission: 'region:update,region:info,region:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 121, permission: 'region:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
