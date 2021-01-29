/*
 * @Description: 用户信息
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-29 22:34:37
 */
import { getToken, setToken, clearToken } from '@U/token'
import { IUser } from './index.type'
export default {
  namespaced: true,
  state: {
    id: '',
    username: '',
    token: getToken()
  },
  getters: {
    token: (state: IUser) => state.token
  },
  mutations: {
    SET_ID: (state: IUser, id: string): void => {
      state.id = id
    },
    SET_USERNAME: (state: IUser, username: string): void => {
      state.username = username
    },
    SET_TOKEN: (state: IUser, token: string): void => {
      state.token = token
    }
  },
  actions: {
    setId: ({ commit }, id: string): void => {
      commit('SET_ID', id)
    },
    setUsername: ({ commit }, usernane: string): void => {
      commit('SET_USERNAME', usernane)
    },
    setToken: ({ commit }, token: string): void => {
      setToken(token)
      commit('SET_TOKEN', token)
    },
    clearToken: ({ commit }): void => {
      clearToken()
      commit('SET_TOKEN', '')
    }
  }
}
