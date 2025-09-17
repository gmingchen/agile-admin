import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '数据源',
    value: 161,
    icon: 'database',
    permission: 'dataSource:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/data-source',
      name: 'infrastructure-develop-data-source',
      component: '/infrastructure/develop/data-source/index',
    },
    children: [
      { label: '查看', value: 162, permission: 'dataSource:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 163, permission: 'dataSource:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 164, permission: 'dataSource:update,dataSource:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 165, permission: 'dataSource:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 166, permission: 'dataSource:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 167, permission: 'dataSource:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
