import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '岗位管理',
    value: 58,
    icon: 'database',
    permission: 'post:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/system/post',
      name: 'system-post',
      component: '/system/post/index',
    },
    children: [
      { label: '查看', value: 59, permission: 'post:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 60, permission: 'post:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 61, permission: 'post:update,post:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 62, permission: 'post:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 63, permission: 'post:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 133, permission: 'post:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
