// 缓存
const cacheMap = new Map()

/**
 * 根据路由名称、query和params参数 转成组件名称
 * @param {*} name 路由名称
 * @param {*} query 路由query参数
 * @param {*} params 路由params参数
 */
const routeToComponentName = (name, query, params) => {
  let result = name
  for (const key in query) {
    result += `&${key}=${query[key]}`
  }
  for (const key in params) {
    result += `&${key}=${params[key]}`
  }
  return result
}
/**
 * 根据标签页的value 转成JSON对象
 * @param {*} value tab value 值
 */
const tabValueToJson = (value) => {
  const values = value.split('&')
  const name = values[0]
  const query = JSON.parse(values[2])
  const params = JSON.parse(values[3])
  return { name, query, params }
}
/**
 * 根据标签页的value 转成组件名称
 * @param {*} value tab value 值
 */
const tabValueToComponentName = (value) => {
  const { name, query, params } = tabValueToJson(value)
  return routeToComponentName(name, query, params)
}

/**
 * 组件缓存处理
 * @param {*} component 组件
 */
export const handleCache = (component, route) => {
  const { name, query, params, meta: { multiple } } = route
  if (multiple) {
    const key = routeToComponentName(name, query, params)
    let cache
    if (cacheMap.has(key)) {
      cache = cacheMap.get(key)
    } else {
      cache = {
        name: key,
        render: () => h(component)
      }
      cacheMap.set(key, cache)
    }
    return cache
  }
  return component
}

/**
 * 递归查询需要缓存的组件名称
 * @param {*} menus 可以缓存的菜单列表
 */
export const findKeepaliveName = (tabs, menus) => {
  const list = []
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    for (let j = 0; j < tabs.length; j++) {
      const { menuValue, value } = tabs[j]
      if (menuValue === menu.value && menu.keepalive) {
        let name = menu.componentName
        if (menu.multiple) {
          name = tabValueToComponentName(value)
        }
        list.push(name)
      }
    }
    if (menu.children && menu.children.length) {
      const arr = findKeepaliveName(tabs, menu.children)
      if (arr.length) {
        menu.componentName && list.push(menu.componentName)
        list.push(...arr)
      }
    }
  }
  return list
}
