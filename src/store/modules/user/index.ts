/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2020-12-29 17:30:24
 */
import { getToken, setToken, clearToken } from '@U/token'
import { IUser } from './index.type'
export default {
  state: {
    token: getToken()
  },
  getters: {
    token: (state: IUser) => state.token
  },
  mutations: {
    SET_TOKEN: (state: IUser, token: string) => {
      state.token = token
    },
    CLEAR_TOKEN: (state: IUser) => {
      state.token = ''
    }
  },
  actions: {
    setToken: ({ commit }, token: string) => {
      setToken(token)
      commit('SET_TOKEN', token)
    },
    clearToken: ({ commit }) => {
      clearToken()
      commit('CLEAR_TOKEN')
    }
  }
}
