import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '租户套餐',
    value: 38,
    icon: 'reduction',
    permission: 'package:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/system/package',
      name: 'system-package',
      component: '/system/package/index',
    },
    children: [
      { label: '查看', value: 39, permission: 'package:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 40, permission: 'package:create,permission:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 41, permission: 'package:update,package:info,permission:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 42, permission: 'package:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 43, permission: 'package:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 129, permission: 'package:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
