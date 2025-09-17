import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '任务列表',
    value: 26,
    icon: 'list',
    permission: 'job:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/job/list',
      name: 'infrastructure-develop-job-list',
      component: '/infrastructure/develop/job/list/index',
    },
    children: [
      { label: '查看', value: 27, permission: 'job:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 28, permission: 'job:create', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 29, permission: 'job:update,job:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 30, permission: 'job:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '执行', value: 31, permission: 'job:run', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '恢复', value: 32, permission: 'job:resume', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '暂停', value: 33, permission: 'job:pause', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
