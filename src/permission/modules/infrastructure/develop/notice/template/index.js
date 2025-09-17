import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '通知模版',
    value: 80,
    icon: 'login-log',
    permission: 'noticeTemplate:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/notice/template',
      name: 'infrastructure-develop-notice-template',
      component: '/infrastructure/develop/notice/template/index',
    },
    children: [
      { label: '查看', value: 81, permission: 'noticeTemplate:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 82, permission: 'noticeTemplate:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 83, permission: 'noticeTemplate:update,noticeTemplate:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 84, permission: 'noticeTemplate:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 85, permission: 'noticeTemplate:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 138, permission: 'noticeTemplate:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
