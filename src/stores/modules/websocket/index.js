import { getWebsocketOrigin, Websocket } from '@/common/utils'
import { useAuthStore } from '../auth'

export const useWebsocketStore = defineStore('websocket', {
  state: () => ({
    socket: null,
    response: null,
  }),
  getters: {},
  actions: {
    /**
     * 初始化websocket
     */
    init() {
      const url = `${getWebsocketOrigin()}/slipper/websocket/${useAuthStore().token}`
      this.socket = new Websocket(url, data => this.response = data)
      this.socket.connect()
    },
    /**
     * 发送信息
     * @param {*} data
     */
    send(data) {
      const params = {
        type: 1,
        requestBody: data
      }
      this.socket.send(params)
    },
    /**
     * 手动断开websocket
     */
    close() {
      if (this.socket) {
        this.socket.close()
      }
      this.response = null
      this.socket = null
    }
  }
})
