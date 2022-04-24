/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { selfInfoApi } from '@/api/enterprise'

export default {
  state: {
    enterprise: {
      id: '',
      name: '',
      logo: ''
    }
  },
  getters: {
  },
  mutations: {
    SET_ENTERPRISE: (state, enterprise) => {
      state.enterprise = enterprise
    }
  },
  actions: {
    /**
     * 获取当前用户信息
     * @returns
     */
    async getEnterprise({ commit }) {
      const r = await selfInfoApi()
      if (r) {
        commit('SET_ENTERPRISE', r.data)
      }
      return r
    }
  }
}
