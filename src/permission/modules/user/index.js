import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '用户管理',
    value: 168,
    icon: 'user',
    permission: 'catalog:user',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      {
        label: '用户列表',
        value: 169,
        icon: 'user',
        permission: 'user:page',
        keepalive: false,
        tab: true,
        multiple: false,
        show: true,
        type: PERMISSION_TYPE_ENUM.MENU,
        route: {
          path: '/user/list',
          name: 'user-list',
          component: '/user/list/index',
        },
        children: [
          { label: '查看', value: 170, permission: 'user:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
          { label: '删除', value: 171, permission: 'user:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
          { label: '设置是否禁用', value: 172, permission: 'user:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
          { label: '导出', value: 173, permission: 'user:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
        ]
      },
      {
        label: '用户详情',
        value: 174,
        icon: '',
        permission: 'user:info',
        keepalive: false,
        tab: true,
        multiple: true,
        show: false,
        type: PERMISSION_TYPE_ENUM.ROUTER,
        route: {
          path: '/user/details',
          name: 'user-details',
          component: '/user/details/index',
        }
      },
    ]
  }
]


