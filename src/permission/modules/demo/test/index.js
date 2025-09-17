import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '演示页面(数据权限,多数据源)',
    value: 155,
    icon: 'visits',
    permission: 'test:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/demo/test',
      name: 'demo-test',
      component: '/demo/test/index',
    },
    children: [
      { label: '查看', value: 156, permission: 'test:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 157, permission: 'test:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 158, permission: 'test:update,test:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 159, permission: 'test:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 160, permission: 'test:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
