/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { clearJson } from '@/utils/index'
import { clearToken, getToken, setToken } from '@/utils/storage'
import { loginApi, logoutApi } from '@/api/login'
import { selfInfoApi } from '@/api/administrator'

export default {
  state: {
    administrator: {
      id: '',
      username: '',
      nickname: '',
      avatar: '',
      mobile: '',
      email: '',
      status: '',
      roles: [],
      supervisor: '',
      enterprise_id: ''
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
    SET_ADMINISTRATOR: (state, administrator) => {
      state.administrator = administrator
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    CLEAR_ADMINISTRATOR: state => {
      clearJson(state.administrator)
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
    async getAdministrator({ commit }) {
      const r = await selfInfoApi()
      if (r) {
        commit('SET_ADMINISTRATOR', r.data)
      }
      return r
    },
    // /**
    //  * 编辑当前用户信息
    //  * @param {*} params
    //  */
    // async editUser({ dispatch }, params) {
    //   const r = await editUserInfoApi(params)
    //   if (r.data !== 1) {
    //     dispatch('getUser')
    //   }
    //   return r
    // },
    /**
     * 退出当前账户
     * @returns
     */
    async logout() {
      const r = await logoutApi()
      return r
    },
    /**
     * 清除登录用户信息
     * @param {*} param0
     * @param {*} flag
     */
    clearAdministrator({ commit }) {
      commit('CLEAR_ADMINISTRATOR')
    },
    /**
     * 清除登录用户凭证
     * @param {*} param0
     * @param {*} flag
     */
    clearToken({ commit }) {
      commit('CLEAR_TOKEN')
    }
  }
}
