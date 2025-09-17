import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '备份管理',
    value: 122,
    icon: 'backup',
    permission: 'backup:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/backup',
      name: 'infrastructure-develop-backup',
      component: '/infrastructure/develop/backup/index',
    },
    children: [
      { label: '查看', value: 123, permission: 'backup:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '备份', value: 124, permission: 'backup:backup', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '恢复', value: 125, permission: 'module:recovery', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 126, permission: 'module:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 143, permission: 'backup:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
