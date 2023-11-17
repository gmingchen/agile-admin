import { adminerMenuApi } from '@/api/auth'
import { useTabsStore } from './tabs'
// console.log(useTabsStore())

import { getLoad, setLoad, clearLoad, getMenuAndPermission, setMenuAndPermission, clearMenuAndPermission } from '@/utils/storage'
import { MENU_KEY, PERMISSION_KEY } from '@/utils/constant'
import { MenuType } from '@/utils/enum'
import { parseData2Tree, clearJson } from '@/utils'
import { findKeepaliveName } from '@/utils/cache'

const load = getLoad()
const data = getMenuAndPermission()

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
        const defaultValue = item.url ? item.url.substring(1, item.url.length).replace(/\//g, '-') : ''
        return {
          id: item.id,
          label: item.name,
          icon: item.icon,
          type: item.type,
          url: item.url,
          path: item.type === 3 ? `/i-${ item.id }` : item.routePath || (item.url ? `/${ defaultValue }` : ''),
          name: item.type === 3 ? `i-${ item.id }` : item.routeName || (item.url ? defaultValue : ''),
          componentName: item.componentName,
          parentId: item.parentId,
          children: []
        }
      })
      return parseData2Tree(reulst)
    },
    allMenus: (state) => {
      const reulst = state.menus.map(item => {
        const defaultValue = item.url ? item.url.substring(1, item.url.length).replace(/\//g, '-') : ''
        return {
          id: item.id,
          label: item.name,
          icon: item.icon,
          type: item.type,
          url: item.url,
          path: item.type === 3 ? `/i-${ item.id }` : item.routePath || (item.url ? `/${ defaultValue }` : ''),
          name: item.type === 3 ? `i-${ item.id }` : item.routeName || (item.url ? defaultValue : ''),
          componentName: item.componentName,
          parentId: item.parentId,
          children: []
        }
      })
      return parseData2Tree(reulst)
    },
    keepaliveMenus: (state) => {
      const list = state.menus.filter(item => item.keepalive && item.componentName && item.componentName.trim())
      return parseData2Tree(list)
    },
    keepaliveNames: (state, a) => {
      // console.log(useTabsStore())
      return findKeepaliveName(useTabsStore().tabs, state.keepaliveMenus)
      // return useTabsStore().tabs
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
