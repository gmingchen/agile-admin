import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: 'label',
    value: 'value',
    icon: 'icon',
    permission: 'permission',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.permissionType,
    route: {
      path: 'path',
      name: 'name',
      component: 'component'
    },
    children: 'component'
  },
]
