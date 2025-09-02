import { usePermissionStore, useMenuStore } from '@/stores'
import { parseDataToTree, print, printWarn } from '@/common/utils'
import { PERMISSION_TYPE_ENUM } from '@/common/enums'
import { loginPermissionApi } from '@/apis'
import { menus as localMenus } from './modules'
import { filterMenus, validatePermission } from './utils'

/*
  todo 菜单对象属性 远程路由会处理成该格式
  value: 唯一值
  label: 显示名称
  icon: 图标
  permission: 权限code 支持多个 逗号分隔 需要与后端协定 不设置则不需要权限
  keepalive: 是否缓存
  tab: 是否在tab中显示
  multiple: 是否可以多个tab打开
  show: 是否显示在侧边栏
  type: 类型 PERMISSION_TYPE_ENUM
  route: {
    path: 路由路径
    name: 路由名称
    redirect: 重定向
    component: 组件路径 理论上都是 /src/views/modules 下的组件
  }
  children: 子菜单
*/

/**
 * 解析远程获取的菜单
 * @param {*} list
 * @returns
 */
const parseRemoteMenu = (list) => {
  const result = []
  list.forEach(item => {
    const {
      id, name, icon, permission, keepalive, tab, multiple, show, type,
      routePath, routeName, redirectName, url,
      ...others
    } = item
    const menu = {
      value: id,
      label: name,
      icon: icon,
      permission: permission,
      keepalive: keepalive === 1,
      tab: tab === 1,
      multiple: multiple === 1,
      show: show === 1,
      type: type,
      ...others,
    }
    if (type === PERMISSION_TYPE_ENUM.MENU || type === PERMISSION_TYPE_ENUM.ROUTER) {
      const defaultValue = url.substring(1, url.length).replace(/\//g, '-')
      menu.route = {
        path: routePath || `/${ defaultValue }`,
        name: routeName || defaultValue,
        redirect: redirectName ? { name: redirectName }: null,
        component: url
      }
    }
    result.push(menu)
  })
  return result
}
/**
 * 获取权限数据
 */
const getPermissionData = async () => {
  const r = await loginPermissionApi()
  if (r) {
    const permissionStore = usePermissionStore()
    permissionStore.loaded = true
    permissionStore.permissions = r.data.permissions

    // todo：这里决定是本地路由还是后端路由
    // let menus = filterMenus(localMenus, item => validatePermission(r.data.permissions, item.permission))
    let menus = parseRemoteMenu(r.data.menus)
    menus = parseDataToTree(menus, 'value')

    const menuStore = useMenuStore()
    menuStore.menus = menus
  }
  return r
}

/**
 * 判断是否有该权限
 * @param {*} permission 权限code 多个使用 & 或 | 分隔开 (&-并且 |-或者)
 * @returns
 */
const hasPermission = (permission) => {
  if (!permission) return printWarn('权限code不能为空')
  let result = false
  const separator = permission.indexOf('|') === -1 ? '&' : '|'
  const permissions = permission.split(separator)
  let fn = ''
  switch (separator) {
    case '&':
      fn = 'every'
      break
    case '|':
      fn = 'some'
      break
  }
  const list = usePermissionStore().permissions
  result = fn && permissions[fn](item => {
    return list.indexOf(item) !== -1
  })
  return result
}


export function havePermission(permission) {
  let result = false
  const separator = permission.indexOf('|') === -1 ? '&' : '|'
  const permissions = permission.split(separator)
  let fn = ''
  switch (separator) {
    case '&':
      fn = 'every'
      break
    case '|':
      fn = 'some'
      break
  }
  const list = useMenuStore().permissions
  result = fn && permissions[fn](item => {
    return list.indexOf(item) !== -1
  })
  return result
}

export * from './utils'

export {
  getPermissionData,
  hasPermission
}
