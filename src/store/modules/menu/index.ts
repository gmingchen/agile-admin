/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-19 17:51:59
 */
import { ActionContext } from 'vuex'
import { IMenu, IMenuResponseData } from '@/api/login/index.type'
import { IMenuState, ISideMenu } from './index.type'
import { getIsGet, getMenuAndPermissions, setIsGet, setMenuAndPermissions } from '@/utils/storage'
import { isURL } from '@/utils/regular'

// 初始化菜单数据
const initVal: IMenuResponseData = getMenuAndPermissions()
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
function menuProcessing(list: IMenu[] = []): ISideMenu[] {
  const result: ISideMenu[] = []
  list.forEach(item => {
    if (item.type === 0 || item.type === 1) {
      const obj: ISideMenu = {
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

export default {
  state: {
    active: '', // 当前选中
    isCollapse: false, // 是否折叠
    isGet: getIsGet(),
    menus: init(1),
    permissions: init(2)
  },
  getters: {
    isGet: (state: IMenuState): boolean => {
      return state.isGet
    },
    menus: (state: IMenuState): IMenu[] => {
      return state.menus
    },
    permissions: (state: IMenuState): string[] => {
      return state.permissions
    },
    processedMenu: (state: IMenuState): ISideMenu[] => {
      return menuProcessing(state.menus)
    }
  },
  mutations: {
    SET_IS_GET: (state: IMenuState, isGet: boolean): void => {
      state.isGet = isGet
    },
    SET_MENU: (state: IMenuState, menus: IMenu[]): void => {
      state.menus = menus
    },
    SET_PERMISSION: (state: IMenuState, permissions: string[]): void => {
      state.permissions = permissions
    },
    SET_ACTIVE: (state: IMenuState, active: string): void => {
      state.active = active
    },
    SET_IS_COLLAPSE: (state: IMenuState, isCollapse: boolean): void => {
      state.isCollapse = isCollapse
    },
    CLEAR: (state: IMenuState): void => {
      state.isCollapse = false
      state.isGet = false
      state.menus = []
      state.permissions = []
    }
  },
  actions: {
    setIsGet({ commit }: ActionContext<IMenuState, null>, val: boolean = true): void {
      setIsGet(val)
      commit('SET_IS_GET', val)
    },
    setMenuAndPermission({ commit, dispatch }: ActionContext<IMenuState, null>, data: IMenuResponseData): void {
      setMenuAndPermissions(data)
      commit('SET_MENU', data.menus)
      commit('SET_PERMISSION', data.permissions)
      dispatch('setIsGet', true)
    },
    setActive({ commit }: ActionContext<IMenuState, null>, active: string): void {
      commit('SET_ACTIVE', active)
    },
    setIsCollapse({ commit }: ActionContext<IMenuState, null>, isCollapse: boolean = false): void {
      commit('SET_IS_COLLAPSE', isCollapse)
    },
    clear({ commit }: ActionContext<IMenuState, null>): void {
      commit('CLEAR')
    }
  }
}
