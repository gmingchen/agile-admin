/*
 * @Description: WebSocket
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 消息推送
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function sendApi(params) {
  return service({
    url: '/backstage/websocket/send',
    method: 'post',
    data: params
  })
}
