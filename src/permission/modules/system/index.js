import { PERMISSION_TYPE_ENUM } from '@/common/enums'

import packages from './packages'
import tenant from './tenant'
import role from './role'
import adminer from './adminer'
import dept from './dept'
import post from './post'

export default [
  {
    label: '系统管理',
    value: 37,
    icon: 'set',
    permission: 'catalog:system',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      ...packages,
      ...tenant,
      ...role,
      ...adminer,
      ...dept,
      ...post,
    ]
  }
]
