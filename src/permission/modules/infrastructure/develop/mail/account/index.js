import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '邮箱账号',
    value: 101,
    icon: 'email',
    permission: 'mailAccount:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/mail/account',
      name: 'infrastructure-develop-mail-account',
      component: '/infrastructure/develop/mail/account/index',
    },
    children: [
      { label: '查看', value: 102, permission: 'mailAccount:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 103, permission: 'mailAccount:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 104, permission: 'mailAccount:update,mailAccount:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 105, permission: 'mailAccount:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否是主配置', value: 106, permission: 'mailAccount:master', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 140, permission: 'mailAccount:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
