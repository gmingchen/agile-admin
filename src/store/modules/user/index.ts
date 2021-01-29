/*
 * @Description: 用户信息
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-29 17:29:47
 */
import { getToken, setToken, clearToken } from '@U/token'
import { IUser } from './index.type'
export default {
  namespaced: true,
  state: {
    username: '222',
    token: getToken()
  },
  getters: {
    token: (state: IUser) => state.token
  },
  mutations: {
    SET_TOKEN: (state: IUser, token: string): void => {
      state.token = token
    },
    CLEAR_TOKEN: (state: IUser): void => {
      state.token = ''
    }
  },
  actions: {
    setToken: ({ commit }, token: string): void => {
      setToken(token)
      commit('SET_TOKEN', token)
    },
    clearToken: ({ commit }): void => {
      clearToken()
      commit('CLEAR_TOKEN')
    }
  }
}
