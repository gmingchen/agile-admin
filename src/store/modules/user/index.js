/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { clearJson } from '@/utils/index'
import { getToken, setToken } from '@/utils/storage'

export default {
  state: {
    user: {
      id: '',
      username: '',
      nickname: '',
      mobile: '',
      email: '',
      avatar: '',
      status: '',
      roles: []
    },
    token: {
      user_id: '',
      token: getToken(),
      expired_at: '',
      updated_at: ''
    }
  },
  getters: {
    tokenVal: state => {
      return state.token.token
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    CLEAR_USER: state => {
      clearJson(state.user)
    },
    CLEAR_TOKEN: state => {
      clearJson(state.token)
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    setToken({ commit }, token) {
      setToken(token.token)
      commit('SET_TOKEN', token)
    },
    clear({ commit }, flag = false) {
      if (flag) {
        commit('CLEAR_TOKEN')
      }
      commit('CLEAR_USER')
    }
  }
}
