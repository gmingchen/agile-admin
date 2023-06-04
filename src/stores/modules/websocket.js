import WebsocketClass from '@/utils/websocket'
import { useAuthStore } from './auth'

export const useWebsocketStore = defineStore('websocket', {
  state: () => ({
    response: null,
    socket: null
  }),
  getters: {},
  actions: {
    /**
     * 初始化websocket
     */
    init() {
      if (!this.socket) {
        const url = import.meta.env.VITE_WS_URL + useAuthStore().token
        this.socket = new WebsocketClass(url, data => {
          this.response = data
          if (data.data) {
            switch (data.data.type) {
              case -1:
                break
              default:
                console.log('🚲~~:', data)
                break
            }
          } else {
            console.log('🚲~~:', data)
          }
        })
        this.socket.connect()
      }
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
      console.log('✈️:~~', params)
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
