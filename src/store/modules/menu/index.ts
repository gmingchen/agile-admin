/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-19 17:51:59
 */
import { ActionContext } from 'vuex'
import { getIsGet, getMenuAndPermissions, setIsGet, setMenuAndPermissions } from '@/utils/storage'
import { isURL } from '@/utils/regular'
import { UserMenus } from '@/api/login'
import { Menu } from '@/types/menu'

// 初始化菜单数据
const initVal: UserMenus = getMenuAndPermissions()
function init(type: number = 1) {
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
function menuProcessing(list: Menu.Vo[] = []): Menu.Side[] {
  const result: Menu.Side[] = []
  list.forEach(item => {
    if (item.type === 0 || item.type === 1) {
      const obj: Menu.Side = {
        id: item.id,
        parentId: item.parent_id,
        name_cn: item.name_cn,
        name_en: item.name_en,
        icon: item.icon,
        routePath: isURL(item.url) ? item.url : item.url ? `/${ item.url.replace(/\//g, '-') }` : '',
        routeName: isURL(item.url) ? item.url : item.url ? item.url.replace(/\//g, '-') : '',
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

interface State {
  active: string
  isCollapse: boolean
  isGet: boolean
  menus: Menu.Vo[],
  permissions: string[]
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
    isGet: (state: State): boolean => {
      return state.isGet
    },
    menus: (state: State): Menu.Vo[] => {
      return state.menus
    },
    permissions: (state: State): string[] => {
      return state.permissions
    },
    processedMenu: (state: State): Menu.Side[] => {
      return menuProcessing(state.menus)
    }
  },
  mutations: {
    SET_IS_GET: (state: State, isGet: boolean): void => {
      state.isGet = isGet
    },
    SET_MENU: (state: State, menus: Menu.Vo[]): void => {
      state.menus = menus
    },
    SET_PERMISSION: (state: State, permissions: string[]): void => {
      state.permissions = permissions
    },
    SET_ACTIVE: (state: State, active: string): void => {
      state.active = active
    },
    SET_IS_COLLAPSE: (state: State, isCollapse: boolean): void => {
      state.isCollapse = isCollapse
    },
    CLEAR: (state: State): void => {
      state.isCollapse = false
      state.isGet = false
      state.menus = []
      state.permissions = []
    }
  },
  actions: {
    setIsGet({ commit }: ActionContext<State, null>, val: boolean = true): void {
      setIsGet(val)
      commit('SET_IS_GET', val)
    },
    setMenuAndPermission({ commit, dispatch }: ActionContext<State, null>, data: UserMenus): void {
      setMenuAndPermissions(data)
      commit('SET_MENU', data.menus)
      commit('SET_PERMISSION', data.permissions)
      dispatch('setIsGet', true)
    },
    setActive({ commit }: ActionContext<State, null>, active: string): void {
      commit('SET_ACTIVE', active)
    },
    setIsCollapse({ commit }: ActionContext<State, null>, isCollapse: boolean = false): void {
      commit('SET_IS_COLLAPSE', isCollapse)
    },
    clear({ commit }: ActionContext<State, null>): void {
      commit('CLEAR')
    }
  }
}
