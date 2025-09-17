import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '角色',
    value: 50,
    icon: 'online',
    permission: 'role:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/system/role',
      name: 'system-role',
      component: '/system/role/index',
    },
    children: [
      { label: '查看', value: 51, permission: 'role:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 52, permission: 'role:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 53, permission: 'role:update,role:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 54, permission: 'role:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 55, permission: 'role:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置菜单权限', value: 56, permission: 'role:permission,role:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置数据权限', value: 57, permission: 'role:data,role:info,dept:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 130, permission: 'role:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
