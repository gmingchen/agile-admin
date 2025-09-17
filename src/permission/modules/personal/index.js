import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '个人中心',
    value: 90,
    icon: '',
    permission: 'page:personal,notice:adminerPage',
    keepalive: false,
    tab: false,
    multiple: false,
    show: false,
    type: PERMISSION_TYPE_ENUM.ROUTER,
    route: {
      path: '/personal',
      name: 'personal',
      component: '/personal/index',
    },
    children: [
      { label: '查看', value: 151, permission: 'page:personal', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '修改基础信息', value: 147, permission: 'auth:updateBasic', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '修改密码', value: 148, permission: 'auth:updatePassword', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '操作日志', value: 149, permission: 'operateLog:latest', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '登录日志', value: 150, permission: 'loginLog:latest', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
