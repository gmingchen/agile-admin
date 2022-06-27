import WebsocketClass from '@/utils/websocket'
import { parseStringDate } from '@/utils'

export default {
  state: {
    response: null,
    socket: null
  },
  getters: {
  },
  mutations: {
    INIT: (state, token) => {
      const url = process.env.VUE_APP_WS_URL + token
      state.socket = new WebsocketClass(url, data => {
        state.response = data
        console.log('🚲~~:', data)
      })
      state.socket.connect()
    },
    SEND: (state, data) => {
      const params = {
        type: 1,
        requestBody: data
      }
      console.log('✈️:~~', params)
      state.socket.send(params)
    },
    CLOSE: (state) => {
      if (state.socket) {
        state.socket.close()
      }
      state.response = null
      state.body = null
      state.socket = null
    }
  },
  actions: {

    /**
     * @description: 初始化websocket
     * @param {*} commit
     * @param {*} rootState
     * @return {*}
     * @author: gumingchen
     */
    init({ commit, rootState, state }) {
      if (!state.socket) {
        commit('INIT', rootState.administrator.token.token)
      }
    },

    /**
     * @description: 发送信息
     * @param {*} commit
     * @param {*} data
     * @return {*}
     * @author: gumingchen
     */
    send({ commit }, data) {
      commit('SEND', data)
    },

    /**
     * @description: 手动断开websocket
     * @param {*} commit
     * @return {*}
     * @author: gumingchen
     */
    close({ commit }) {
      commit('CLOSE')
    }
  }
}
