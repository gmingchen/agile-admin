import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '通知记录',
    value: 86,
    icon: 'database',
    permission: 'notice:page,tenant:selectPage',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/notice/list',
      name: 'infrastructure-develop-notice-list',
      component: '/infrastructure/develop/notice/list/index',
    },
    children: [
      { label: '查看', value: 87, permission: 'notice:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 88, permission: 'notice:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '测试通知', value: 89, permission: 'notice:push,noticeTemplate:select,dept:select,adminer:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 139, permission: 'notice:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
