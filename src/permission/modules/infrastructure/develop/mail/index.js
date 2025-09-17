import { PERMISSION_TYPE_ENUM } from '@/common/enums'

import account from './account'
import template from './template'
import list from './list'

export default [
  {
    label: '电子邮箱',
    value: 100,
    icon: 'visits',
    permission: 'catalog:email',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      ...account,
      ...template,
      ...list,
    ]
  }
]
