import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '任务日志',
    value: 98,
    icon: 'log',
    permission: 'jobLog:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/job/log',
      name: 'infrastructure-develop-job-log',
      component: '/infrastructure/develop/job/log/index',
    },
    children: [
      { label: '查看', value: 99, permission: 'jobLog:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 136, permission: 'jobLog:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
