import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '用户管理',
    value: 'user',
    icon: 'user',
    permission: 'catalog:user',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      {
        label: '用户列表',
        value: 'user-list',
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
          { label: '查看', value: 'user-view', permission: 'user:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
          { label: '新增', value: 'user-create', permission: 'user:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
          { label: '编辑', value: 'user-update', permission: 'user:update,user:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
          { label: '删除', value: 'user-delete', permission: 'user:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
        ]
      },
      {
        label: '用户详情',
        value: 'user-details',
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


