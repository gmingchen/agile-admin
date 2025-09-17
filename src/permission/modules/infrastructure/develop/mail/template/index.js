import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '邮件模版',
    value: 107,
    icon: 'email',
    permission: 'mailTemplate:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/mail/template',
      name: 'infrastructure-develop-mail-template',
      component: '/infrastructure/develop/mail/template/index',
    },
    children: [
      { label: '查看', value: 108, permission: 'mailTemplate:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 109, permission: 'mailTemplate:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 110, permission: 'mailTemplate:update,mailTemplate:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 111, permission: 'mailTemplate:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 112, permission: 'mailTemplate:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 141, permission: 'mailTemplate:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
