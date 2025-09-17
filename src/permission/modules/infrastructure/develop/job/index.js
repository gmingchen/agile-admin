import { PERMISSION_TYPE_ENUM } from '@/common/enums'

import list from './list'
import log from './log'

export default [
  {
    label: '定时任务',
    value: 222,
    icon: 'clock',
    permission: 'catalog:job',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      ...list,
      ...log,
    ]
  }
]
