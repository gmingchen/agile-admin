export default class WebsocketClass {
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
    this.status = 0 // 连接状态: 0-关闭 1-连接 2-手动关闭
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
  send(data) {
    return this.ws.send(JSON.stringify(data))
  }

  /**
   * @description: 关闭weibsocket 主动关闭不会触发重连
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  close() {
    this.status = 2
    this.ws.close()
  }

  /**
   * @description: socket关闭事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  onClose(e) {
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
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  heartHandler() {
    const data = {
      type: 0
    }
    this.pingInterval = setInterval(() => {
      if (this.status === 1) {
        this.ws.send(JSON.stringify(data))
      } else {
        clearInterval(this.pingInterval)
      }
    }, this.ping)
  }
}
