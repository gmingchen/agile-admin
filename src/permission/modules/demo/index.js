import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '演示模块',
    value: 'demo',
    icon: 'visits',
    permission: 'catalog:demoModule',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      {
        label: '演示页面(数据权限,多数据源)',
        value: 'test',
        icon: 'visits',
        permission: 'test:page',
        keepalive: true,
        tab: true,
        multiple: false,
        show: true,
        type: PERMISSION_TYPE_ENUM.MENU,
        route: {
          path: '/test',
          name: 'test',
          component: '/test/index',
        },
        children: [
          { label: '查看', value: 'test-view', permission: 'test:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
          { label: '新增', value: 'test-create', permission: 'test:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
          { label: '编辑', value: 'test-update', permission: 'test:update,test:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
          { label: '删除', value: 'test-delete', permission: 'test:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
        ]
      },
      {
        label: '嵌套路由演示',
        value: 'nest-router',
        icon: 'visits',
        permission: 'router:demo',
        keepalive: true,
        tab: true,
        multiple: false,
        show: true,
        type: PERMISSION_TYPE_ENUM.ROUTER,
        route: {
          path: '/nest-router',
          name: 'nest-router',
          redirect: 'nest-router1',
          component: '/nest-router/index'
        },
        children: [
          {
            label: '嵌套路由1',
            value: 'nest-router1',
            icon: 'visits',
            permission: 'menu:demo1',
            keepalive: true,
            tab: true,
            multiple: false,
            show: false,
            type: PERMISSION_TYPE_ENUM.MENU,
            route: {
              path: '/nest-router1',
              name: 'nest-router1',
              component: '/nest-router/modules/router1'
            },
          },
          {
            label: '嵌套路由2',
            value: 'nest-router2',
            icon: 'visits',
            permission: 'menu:demo2',
            keepalive: true,
            tab: true,
            multiple: false,
            show: false,
            type: PERMISSION_TYPE_ENUM.MENU,
            route: {
              path: '/nest-router2',
              name: 'nest-router2',
              component: '/nest-router/modules/router2',
            },
          },
        ]
      },
    ]
  },
]
