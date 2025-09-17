import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '数据字典',
    value: 9,
    icon: 'data-dictionary',
    permission: 'dict:list,dictSub:list',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/dict',
      name: 'infrastructure-develop-dict',
      component: '/infrastructure/develop/dict/index',
    },
    children: [
      { label: '查看', value: 10, permission: 'dict:info,dictSub:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 11, permission: 'dict:create,dictSub:create,dict:info,dictSub:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 12, permission: 'dict:update,dictSub:update,dict:info,dictSub:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 13, permission: 'dict:delete,dictSub:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否禁用', value: 14, permission: 'dictSub:status', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
