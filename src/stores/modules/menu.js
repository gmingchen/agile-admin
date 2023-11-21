import { adminerMenuApi } from '@/api/auth'
import { useTabsStore } from './tabs'

import { getLoad, setLoad, clearLoad, getMenuAndPermission, setMenuAndPermission, clearMenuAndPermission } from '@/utils/storage'
import { MENU_KEY, PERMISSION_KEY } from '@/utils/constant'
import { MenuType } from '@/utils/enum'
import { parseData2Tree, clearJson } from '@/utils'
import { findKeepaliveName } from '@/utils/cache'

const load = getLoad()
const data = getMenuAndPermission()
/**
 * 格式化菜单
 * @param {*} menu 菜单
 * @returns
 */
const formatMenu = (menu) => {
  const { id, name, icon, url, routePath, routeName, componentName, parentId, type } = menu
  const defaultValue = url ? url.substring(1, url.length).replace(/\//g, '-') : ''
  return {
    id: id,
    label: name,
    icon: icon,
    type: type,
    url: url,
    path: type === 3 ? `/i-${ id }` : routePath || (url ? `/${ defaultValue }` : ''),
    name: type === 3 ? `i-${ id }` : routeName || (url ? defaultValue : ''),
    componentName: componentName,
    parentId: parentId,
    children: []
  }
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    load: load,
    menus: data[MENU_KEY],
    permissions: data[PERMISSION_KEY],
    active: '',
    collapse: false
  }),
  getters: {
    displayedMenus: (state) => {
      const reulst = state.menus.filter(item => item.show && item.type !== MenuType.BUTTON).map(item => {
        return formatMenu(item)
      })
      return parseData2Tree(reulst)
    },
    allMenus: (state) => {
      const reulst = state.menus.map(item => {
        return formatMenu(item)
      })
      return parseData2Tree(reulst)
    },
    keepaliveMenus: (state) => {
      const list = state.menus.filter(item => item.keepalive && item.componentName && item.componentName.trim()).map(item => {
        return formatMenu(item)
      })
      return parseData2Tree(list)
    },
    keepaliveNames: (state) => {
      return findKeepaliveName(useTabsStore().tabs, state.keepaliveMenus)
    }
  },
  actions: {
    /**
     * 设置是否加载
     * @param {*} val
     */
    setLoad(val) {
      this.load = val
      setLoad(val)
    },
    /**
     * 获取菜单权限
     * @returns
     */
    async getMenuAndPermission() {
      const r = await adminerMenuApi()
      if (r) {
        const { menus, permissions } = r.data
        this.menus = menus
        this.permissions = permissions
        this.load = true
        setLoad(true)
        setMenuAndPermission(r.data)
      }
      return r.data
    },
    /**
     * 清除数据
     */
    clear() {
      clearLoad()
      clearMenuAndPermission()
      this.load = false
      this.menus = []
      this.permissions = []
      this.active = ''
      this.collapse = false
    }
  }
})
