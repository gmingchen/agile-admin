import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '邮件记录',
    value: 113,
    icon: 'email',
    permission: 'mail:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/mail/list',
      name: 'infrastructure-develop-mail-list',
      component: '/infrastructure/develop/mail/list/index',
    },
    children: [
      { label: '查看', value: 114, permission: 'mail:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 115, permission: 'mail:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '测试邮件', value: 116, permission: 'mail:send,mailTemplate:select', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 142, permission: 'mail:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
