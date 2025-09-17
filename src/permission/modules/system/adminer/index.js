import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '管理员',
    value: 64,
    icon: 'user',
    permission: 'adminer:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/system/adminer',
      name: 'system-adminer',
      component: '/system/adminer/index',
    },
    children: [
      { label: '查看', value: 65, permission: 'adminer:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 66, permission: 'adminer:create,dept:select,post:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 67, permission: 'adminer:update,adminer:info,dept:select,post:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 68, permission: 'adminer:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 69, permission: 'adminer:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '分配角色', value: 70, permission: 'adminer:role,adminer:info,role:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '重置密码', value: 78, permission: 'adminer:reset,adminer:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 131, permission: 'adminer:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
