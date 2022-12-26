/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { unreadPageApi, setReadApi, setAllReadApi } from '@/api/websocket-administrator'

export default {
  state: {
    list: [],
    page: {
      current: 1,
      size: 20,
      total: 0
    }
  },
  getters: {
  },
  mutations: {
    SET_MESSAGE: (state, list) => {
      state.list = list
    },
    SET_TOTAL: (state, total) => {
      state.page.total = total
    }
  },
  actions: {
    /**
     * 获取未读消息
     * @returns
     */
    async getList({ commit, state }) {
      const { current, size } = state.page
      const params = { current, size }
      const r = await unreadPageApi(params)
      if (r) {
        commit('SET_MESSAGE', r.data.list)
        commit('SET_TOTAL', r.data.total)
      }
      return r
    },
    /**
     * 设置已读
     * @param {*} ids 管理员 推送消息关联ID
     */
    async read({ dispatch }, ids) {
      const params = {
        keys: ids
      }
      const r = await setReadApi(params)
      if (r) {
        dispatch('getList')
      }
    },
    /**
     * 设置全部已读
     */
    async readAll({ dispatch }) {
      const r = await setAllReadApi()
      if (r) {
        dispatch('getList')
      }
    },
    /**
     * 清除数据
     */
    clear({ commit }) {
      commit('SET_MESSAGE', [])
      commit('SET_TOTAL', 0)
    }
  }
}
