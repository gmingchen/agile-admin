import { PERMISSION_TYPE_ENUM } from '@/common/enums'

/**
 * 过滤菜单
 * @param {*} list 数据
 * @param {*} condition 条件函数
 * @returns
 */
export const filterMenus = (list, condition = (() => true)) => {
  const result = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (condition(item)) {
      const row = {
        ...item,
        children: item.children && item.children.length ? filterMenus(item.children, condition) : []
      }
      result.push(row)
    }
  }
  return result
}

/**
 * 查找路由菜单
 * @param {*} list 数据
 * @returns
 */
export const findRouteMenus = list => {
  const result = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const { type, children } = item
    if (type === PERMISSION_TYPE_ENUM.MENU || type === PERMISSION_TYPE_ENUM.ROUTER) {
      result.push(item)
    }
    if (children && children.length && type !== PERMISSION_TYPE_ENUM.ROUTER) {
      result.push(...findRouteMenus(children))
    }
  }
  return result
}


/**
 * 查找第一个有路由的菜单
 */
export const findFirstRouteMenu = list => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const { type, children } = item
    if (type === PERMISSION_TYPE_ENUM.MENU) {
      return item
    } else if (children && children.length) {
      const item = getFirstRouteMenu(children)
      if (item) return item
    }
  }
  return null
}

/**
 * 校验是否有权限
 * @param {*} permissions 权限列表
 * @param {*} menuPermission 菜单权限
 * @returns
 */
export const validatePermission = (permissions, menuPermission) => {
  if (!menuPermission) return true
  const permission = menuPermission.split(',').map(item => item.trim())
  return permission.some((item) => permissions.includes(item))
}

/**
 * 解析菜单 -> 路由
 * @param {*} menu
 * @returns
 */
const dynamics = import.meta.glob('../views/modules/**/*.vue')
const parseMenuToRoute = menu => {
  const { children, route, ...others } = menu
  const result = {
    ...route,
    component: dynamics[`../views/modules${ route.component }.vue`],
    name: route.name || route.path.replace('/', ''),
    redirect: route.redirect || undefined,
    meta: { ...others }
  }
  return result
}

/**
 * 查找路由
 * @param {*} list
 */
export const findRoutes = list => {
  const result = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.type === PERMISSION_TYPE_ENUM.MENU || item.type === PERMISSION_TYPE_ENUM.ROUTER) {
      result.push({
        ...parseMenuToRoute(item),
        children: item.children && item.children.length ? findRoutes(item.children) : []
      })
    } else if (item.children && item.children.length) {
      result.push(...findRoutes(item.children))
    }
  }
  return result
}
