import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '文件列表',
    value: 23,
    icon: 'folder',
    permission: 'file:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/file/list',
      name: 'infrastructure-develop-file-list',
      component: '/infrastructure/develop/file/list/index',
    },
    children: [
      { label: '查看', value: 24, permission: 'file:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 25, permission: 'file:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
