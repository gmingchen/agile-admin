import { PERMISSION_TYPE_ENUM } from '@/common/enums'

import permission from './permission'
import dict from './dict'
import dataSource from './data-source'
import job from './job'
import file from './file'
import mail from './mail'
import notice from './notice'
import region from './region'
import backup from './backup'

export default [
  {
    label: '开发配置',
    value: 2,
    icon: 'development',
    permission: 'catalog:develop',
    show: true,
    type: PERMISSION_TYPE_ENUM.CATALOG,
    children: [
      ...permission,
      ...dict,
      ...dataSource,
      ...job,
      ...file,
      ...mail,
      ...notice,
      ...region,
      ...backup,
    ]
  }
]
