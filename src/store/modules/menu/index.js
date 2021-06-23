/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 17:35:09
 */
import { getIsGet, getMenuAndPermissions, setIsGet, setMenuAndPermissions } from '@/utils/storage'
import { isURL } from '@/utils/regular'

// 初始化菜单数据
const initVal = getMenuAndPermissions()
function init(type = 1) {
  if (type === 1) {
    return initVal.menus
  } else if (type === 2) {
    return initVal.permissions
  }
  setIsGet(false)
  return null
}

/**
 * @description: 递归筛选出 目录、菜单
 * @param {Array} list
 * @return {*}
 * @author: gumingchen
 */
function menuProcessing(list = []) {
  const result = []
  list.forEach(item => {
    if (item.type === 0 || item.type === 1) {
      const obj = {
        id: item.id,
        parentId: item.parent_id,
        name_cn: item.name_cn,
        name_en: item.name_en,
        icon: item.icon,
        routePath: isURL(item.url) ? `/i-${ item.id }` : item.url ? `/${ item.url.replace(/\//g, '-') }` : '',
        routeName: isURL(item.url) ? `i-${ item.id }` : item.url ? item.url.replace(/\//g, '-') : '',
        type: item.type,
        children: []
      }
      if (item.children && item.children.length > 0) {
        obj.children = menuProcessing(item.children)
      }
      result.push(obj)
    }
  })
  return result
}

export default {
  state: {
    active: '', // 当前选中
    isCollapse: false, // 是否折叠
    isGet: getIsGet(),
    menus: init(1),
    permissions: init(2)
  },
  getters: {
    isGet: state => {
      return state.isGet
    },
    menus: state => {
      return state.menus
    },
    permissions: state => {
      return state.permissions
    },
    processedMenu: state => {
      return menuProcessing(state.menus)
    }
  },
  mutations: {
    SET_IS_GET: (state, isGet) => {
      state.isGet = isGet
    },
    SET_MENU: (state, menus) => {
      state.menus = menus
    },
    SET_PERMISSION: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ACTIVE: (state, active) => {
      state.active = active
    },
    SET_IS_COLLAPSE: (state, isCollapse) => {
      state.isCollapse = isCollapse
    },
    CLEAR: state => {
      state.isCollapse = false
      state.isGet = false
      state.menus = []
      state.permissions = []
    }
  },
  actions: {
    setIsGet({ commit }, val = true) {
      setIsGet(val)
      commit('SET_IS_GET', val)
    },
    setMenuAndPermission({ commit, dispatch }, data) {
      setMenuAndPermissions(data)
      commit('SET_MENU', data.menus)
      commit('SET_PERMISSION', data.permissions)
      dispatch('setIsGet', true)
    },
    setActive({ commit }, active) {
      commit('SET_ACTIVE', active)
    },
    setIsCollapse({ commit }, isCollapse = false) {
      commit('SET_IS_COLLAPSE', isCollapse)
    },
    clear({ commit }) {
      commit('CLEAR')
    }
  }
}
