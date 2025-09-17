import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '租户管理',
    value: 44,
    icon: 'reduction',
    permission: 'tenant:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/system/tenant',
      name: 'system-tenant',
      component: '/system/tenant/index',
    },
    children: [
      { label: '查看', value: 45, permission: 'tenant:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 46, permission: 'tenant:create,package:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 47, permission: 'tenant:update,tenant:info,package:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 48, permission: 'tenant:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 49, permission: 'tenant:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 128, permission: 'tenant:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
