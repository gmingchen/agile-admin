import { PERMISSION_TYPE_ENUM } from '@/common/enums'

import config from './config'
import list from './list'


export default [
  {
    label: '文件上传',
    value: 16,
    icon: 'folder',
    permission: 'catalog:file',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      ...config,
      ...list,
    ]
  }
]
