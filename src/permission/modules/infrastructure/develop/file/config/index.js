import { PERMISSION_TYPE_ENUM } from '@/common/enums'

export default [
  {
    label: '文件配置',
    value: 17,
    icon: 'folder',
    permission: 'fileConfig:page',
    keepalive: false,
    tab: true,
    multiple: false,
    show: true,
    type: PERMISSION_TYPE_ENUM.MENU,
    route: {
      path: '/infrastructure/develop/file/config',
      name: 'infrastructure-develop-file-config',
      component: '/infrastructure/develop/file/config/index',
    },
    children: [
      { label: '查看', value: 18, permission: 'fileConfig:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '新增', value: 19, permission: 'fileConfig:create,fileConfig:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '编辑', value: 20, permission: 'fileConfig:update,fileConfig:info', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '删除', value: 21, permission: 'fileConfig:delete', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '设置是否是主配置', value: 22, permission: 'fileConfig:master', type: PERMISSION_TYPE_ENUM.BUTTON, },
      { label: '导出', value: 137, permission: 'fileConfig:export', type: PERMISSION_TYPE_ENUM.BUTTON, },
    ]
  },
]
