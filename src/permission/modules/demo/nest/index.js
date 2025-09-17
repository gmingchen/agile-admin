import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '嵌套路由演示',
    value: 219,
    icon: 'visits',
    permission: 'catalog:demo',
    keepalive: true,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.ROUTER,
    route: {
      path: '/demo/nest-router',
      name: 'demo-nest-router',
      redirect: '/demo/nest-router1',
      component: '/demo/nest-router/index'
    },
    children: [
      {
        label: '嵌套路由1',
        value: 220,
        icon: 'visits',
        permission: 'page:routerDemo1',
        keepalive: true,
        tab: true,
        multiple: false,
        show: false,
        type: PERMISSION_TYPE_ENUM.MENU,
        route: {
          path: '/demo/nest-router1',
          name: 'demo-nest-router1',
          component: '/demo/nest-router/modules/router1'
        },
      },
      {
        label: '嵌套路由2',
        value: 221,
        icon: 'visits',
        permission: 'page:routerDemo2',
        keepalive: true,
        tab: true,
        multiple: false,
        show: false,
        type: PERMISSION_TYPE_ENUM.MENU,
        route: {
          path: '/demo/nest-router2',
          name: 'demo-nest-router2',
          component: '/demo/nest-router/modules/router2',
        },
      },
    ]
  },
]
