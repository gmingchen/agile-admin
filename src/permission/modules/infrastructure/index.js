import { PERMISSION_TYPE_ENUM } from '@/common/enums'

import develop from './develop'
import online from './online'
import ip from './ip'
import log from './log'
import generator from './generator'

export default [
  {
    label: '基础设施',
    value: 15,
    icon: 'folder',
    permission: 'catalog:infrastructure',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      ...develop,
      ...online,
      ...ip,
      ...log,
      ...generator,
    ]
  }
]
