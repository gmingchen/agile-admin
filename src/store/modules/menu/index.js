/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { getGet, setGet, getMenuAndPermission, setMenuAndPermission } from '@/utils/storage'
import { MENU_KEY, PERMISSION_KEY } from '@/utils/constant'
import { selfInfoApi } from '@/api/enterprise-menu'

// 初始化菜单 权限 数据
const data = getMenuAndPermission()

/**
 * @description: 递归筛选出 目录、菜单
 * @param {Array} list
 * @return {*}
 * @author: gumingchen
 */
function menuProcessing(list = []) {
  const result = []
  list.forEach(item => {
    if (item.show === 1 && item.type !== 2) {
      const menu = {
        id: item.menu_id,
        name_cn: item.name_cn,
        name_en: item.name_en,
        icon: item.icon,
        type: item.type,
        url: item.url,
        path: item.type === 3 ? `/i-${ item.menu_id }` : item.path || (item.url ? `/${ item.url.replace(/\//g, '-') }` : ''),
        name: item.type === 3 ? `/i-${ item.menu_id }` : item.name || (item.url ? item.url.replace(/\//g, '-') : ''),
        children: []
      }
      if (item.children && item.children.length > 0) {
        menu.children = menuProcessing(item.children)
      }
      result.push(menu)
    }
  })
  return result
}

export default {
  state: {
    get: getGet(),
    menus: data[MENU_KEY],
    permissions: data[PERMISSION_KEY],
    collapse: false
  },
  getters: {
    menus: state => {
      return menuProcessing(state.menus)
    }
  },
  mutations: {
    SET_GET: (state, get) => {
      state.get = get
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_COLLAPSE: (state, collapse) => {
      state.collapse = collapse
    }
  },
  actions: {
    /**
     * 设置是否获取过 菜单 权限
     * @param {*}
     * @returns
     */
    setGet({ commit }, val = true) {
      setGet(val)
      commit('SET_GET', val)
    },
    /**
     * 获取当前管理员 菜单 权限
     * @param {*}
     * @returns
     */
    async getMenuAndPermission({ commit, dispatch }) {
      const r = await selfInfoApi()
      if (r) {
        dispatch('setGet', true)
        setMenuAndPermission(r.data)
        commit('SET_MENUS', r.data.menus)
        commit('SET_PERMISSIONS', r.data.permissions)
      }
      return r.data.menus
    },
    /**
     * 设置菜单是否折叠
     * @param {*}
     * @returns
     */
    setCollapse({ commit }, collapse) {
      commit('SET_COLLAPSE', collapse)
    }
  }
}
