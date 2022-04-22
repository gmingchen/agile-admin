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
import { loginApi, userInfoApi, editUserInfoApi, logoutApi } from '@/api/login'

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
      created_at: ''
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

    /**
     * 登录
     * @param {*} params
     * @returns
     */
    async login({ commit }, params) {
      const r = await loginApi(params)
      if (r) {
        setToken(r.data.token)
        commit('SET_TOKEN', r.data)
      }
      return r
    },

    /**
     * 获取当前用户信息
     * @returns
     */
    async getUser({ commit }) {
      const r = await userInfoApi()
      if (r) {
        commit('SET_USER', r.data)
      }
      return r
    },

    /**
     * 编辑当前用户信息
     * @param {*} params
     */
    async editUser({ dispatch }, params) {
      const r = await editUserInfoApi(params)
      if (r.data !== 1) {
        dispatch('getUser')
      }
      return r
    },

    /**
     * 退出当前账户
     * @returns
     */
    async logout() {
      const r = await logoutApi()
      return r
    },

    /**
     * 清除登录信息 用户信息
     * @param {*} param0
     * @param {*} flag
     */
    clear({ commit }, flag = false) {
      if (flag) {
        commit('CLEAR_TOKEN')
      }
      commit('CLEAR_USER')
    }
  }
}
