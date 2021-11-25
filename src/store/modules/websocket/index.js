/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-26 08:44:56
 */
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
    init({ commit, rootState }) {
      commit('INIT', rootState.user.token.token)
    },

    /**
     * @description: 发送信息
     * @param {*} commit
     * @param {*} data
     * @return {*}
     * @author: gumingchen
     */
    send({ commit, dispatch }, data) {
      commit('SEND', data)
      const now = new Date()
      dispatch('message/pushPrivateMessage', {
        ack: data.message.ack,
        content: data.message.content,
        created_at: now.getTime(),
        from: data.message.from,
        id: '',
        status: 0,
        to: data.message.to,
        type: data.message.messageType,
        url: data.message.url,
        loading: true
      }, { root: true })
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
