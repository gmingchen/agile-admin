import { PERMISSION_TYPE_ENUM } from '@/common/enums'

import template from './template'
import list from './list'

export default [
  {
    label: '消息通知',
    value: 79,
    icon: 'database',
    permission: 'catalog:notice',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      ...template,
      ...list,
    ]
  }
]
