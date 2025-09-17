import { PERMISSION_TYPE_ENUM } from '@/common/enums'

import operate from './operate'
import login from './login'
import error from './error'

export default [
  {
    label: '追溯日志',
    value: 91,
    icon: 'log',
    permission: 'catalog:log',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      ...operate,
      ...login,
      ...error,
    ]
  }
]
