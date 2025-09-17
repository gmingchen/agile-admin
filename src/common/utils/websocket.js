import { WEBSOCKET_STATUS_ENUM } from '@/common/enums'
import { print } from '@/common/utils'

export function getWebsocketOrigin() {
  let { protocol, host } = window.location
  if (protocol === 'http:') {
    protocol = `ws:`
  } else if (protocol === 'https:') {
    protocol = 'wss:'
  }
  return `${protocol}//${ host }`
}

export class Websocket {
  /**
   * @description: 初始化参数
   * @param {*} url ws资源路径
   * @param {*} callback 服务端信息回调
   * @return {*}
   * @author: gumingchen
   */
  constructor(url, callback) {
    this.url = url
    this.callback = callback
    this.ws = null // websocket 对象
    this.status = WEBSOCKET_STATUS_ENUM.CLOSED // 连接状态: 0-关闭 1-连接 2-手动关闭
    this.ping = 10000 // 心跳时长
    this.pingInterval = null // 心跳定时器
    this.reconnect = 5000 // 重连间隔
  }

  /**
   * @description: 连接
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  connect() {
    print('Websocket connect', this.url)
    this.ws = new WebSocket(this.url)
    // 监听socket连接
    this.ws.onopen = () => {
      print('Websocket onopen')
      this.status = WEBSOCKET_STATUS_ENUM.CONNECTED
      this.handleHeart()
    }
    // 监听socket消息
    this.ws.onmessage = (e) => {
      print('Websocket onmessage', e)
      this.callback(JSON.parse(e.data))
    }
    // 监听socket错误信息
    this.ws.onerror = (e) => {
      print('Websocket onerror', e)
    }
    // 监听socket关闭
    this.ws.onclose = (e) => {
      print('Websocket onclose', e)
      this.handleClose(e)
    }
  }

  /**
   * @description: 发送消息
   * @param {*} data
   * @return {*}
   * @author: gumingchen
   */
  send(data) {
    print('Websocket send', data)
    return this.ws.send(JSON.stringify(data))
  }

  /**
   * @description: 关闭weibsocket 主动关闭不会触发重连
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  close() {
    print('Websocket close', this.url)
    this.status = WEBSOCKET_STATUS_ENUM.MANUAL_CLOSED
    this.ws.close()
  }

  /**
   * @description: socket关闭事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  handleClose(e) {
    this.status = this.status === WEBSOCKET_STATUS_ENUM.MANUAL_CLOSED ? this.status : WEBSOCKET_STATUS_ENUM.CLOSED
    setTimeout(() => {
      if (this.status === WEBSOCKET_STATUS_ENUM.CLOSED) {
        print('Websocket reconnect', e)
        this.connect()
      }
    }, this.reconnect)
  }

  /**
   * @description: 心跳机制
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  handleHeart() {
    const data = { type: -1 }
    this.pingInterval = setInterval(() => {
      if (this.status === WEBSOCKET_STATUS_ENUM.CONNECTED) {
        this.send(data)
      } else {
        clearInterval(this.pingInterval)
      }
    }, this.ping)
  }
}
