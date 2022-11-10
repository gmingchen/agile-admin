import type { IFn } from '@/types'

export default class WebsocketClass {
  url: string // 连接URL
  callback: IFn // 服务端信息回调
  ws: WebSocket | null // websocket 对象
  status: 0 | 1 | 2 // 连接状态: 0-关闭 1-连接 2-手动关闭
  ping: number // 心跳时长
  pingInterval: number | null // 心跳定时器
  reconnect: number // 重连间隔

  /**
   * @description: 初始化参数
   * @param {*} url ws资源路径
   * @param {*} callback 服务端信息回调
   * @return {*}
   * @author: gumingchen
   */
  constructor(url: string, callback: IFn) {
    this.url = url
    this.callback = callback
    this.ws = null
    this.status = 0
    this.ping = 10000
    this.pingInterval = null
    this.reconnect = 5000
  }

  /**
   * @description: 连接
   * @author: gumingchen
   */
  connect() {
    this.ws = new WebSocket(this.url)
    // 监听socket连接
    this.ws.onopen = () => {
      this.status = 1
      this.heartHandler()
    }
    // 监听socket消息
    this.ws.onmessage = (e) => {
      this.callback(JSON.parse(e.data))
    }
    // 监听socket错误信息
    this.ws.onerror = (e) => {
      console.log(e)
    }
    // 监听socket关闭
    this.ws.onclose = (e) => {
      this.onClose(e)
    }
  }

  /**
   * @description: 发送消息
   * @param {*} data
   * @return {*}
   * @author: gumingchen
   */
  send(data: any): void {
    this.ws!.send(JSON.stringify(data))
  }

  /**
   * @description: 关闭weibsocket 主动关闭不会触发重连
   * @author: gumingchen
   */
  close(): void {
    this.status = 2
    this.ws!.close()
  }

  /**
   * @description: socket关闭事件
   * @param {CloseEvent} e
   * @return {*}
   * @author: gumingchen
   */
  onClose(e: CloseEvent): void {
    console.error(e)
    this.status = this.status === 2 ? this.status : 0
    setTimeout(() => {
      if (this.status === 0) {
        this.connect()
      }
    }, this.reconnect)
  }

  /**
   * @description: 心跳机制
   * @author: gumingchen
   */
  heartHandler() {
    const data = {
      type: -1
    }
    this.pingInterval = setInterval(() => {
      if (this.status === 1) {
        this.ws!.send(JSON.stringify(data))
      } else {
        clearInterval(this.pingInterval!)
      }
    }, this.ping)
  }
}
