import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '权限管理',
    value: 3,
    icon: 'menu',
    permission: 'permission:list',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/permission',
      name: 'infrastructure-develop-permission',
      component: '/infrastructure/develop/permission/index',
    },
    children: [
      { label: '查看', value: 4, permission: 'permission:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 5, permission: 'permission:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 6, permission: 'permission:update,permission:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 7, permission: 'permission:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '拖拽', value: 8, permission: 'permission:drag', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
