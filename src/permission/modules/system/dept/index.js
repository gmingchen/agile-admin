import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '部门管理',
    value: 71,
    icon: 'database',
    permission: 'dept:list',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/system/dept',
      name: 'system-dept',
      component: '/system/dept/index',
    },
    children: [
      { label: '查看', value: 72, permission: 'dept:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 73, permission: 'dept:create,dept:select,adminer:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 74, permission: 'dept:update,dept:select,adminer:select,dept:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 75, permission: 'dept:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 76, permission: 'dept:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置数据权限', value: 77, permission: 'dept:data,dept:info,dept:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 132, permission: 'dept:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
