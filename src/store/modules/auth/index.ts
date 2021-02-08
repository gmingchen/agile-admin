/*
 * @Description: 用户信息
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 11:58:52
 */
import { getMenus, getPermissions, getIsGet } from '@U/auth'
import { IAuth, IMenu } from './index.type'
export default {
  namespaced: true,
  state: {
    menus: getMenus(),
    permissions: getPermissions(),
    isGetAuth: getIsGet()
  },
  getters: {
    menus: (state: IAuth) => state.menus
  },
  mutations: {
    SET_MENU: (state: IAuth, menus: Array<IMenu>): void => {
      state.menus = menus
    },
    SET_PERMISSION: (state: IAuth, permissions: string[]): void => {
      state.permissions = permissions
    },
    SET_IS_GET_AUTH: (state: IAuth, isGetAuth: boolean): void => {
      state.isGetAuth = isGetAuth
    }
  },
  actions: {
    setAuth: ({ commit }): void => {
      commit('SET_MENU', getMenus())
      commit('SET_PERMISSION', getPermissions())
      commit('SET_IS_GET_AUTH', getIsGet())
    }
  }
}
