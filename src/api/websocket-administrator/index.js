/*
 * @Description: websocket推送消息 管理员
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2022-06-24 04:27:11
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-06-24 04:27:11
 */
import service from '@/utils/request'

/**
 * @description: 未读分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function unreadPageApi(params) {
  return service({
    url: '/admin/websocket/administrator/unread/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 未读分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/admin/websocket/administrator/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 设置已读
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function setReadApi(params) {
  return service({
    url: '/admin/websocket/administrator/read',
    method: 'post',
    data: params
  })
}

/**
 * @description: 设置全部已读
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function setAllReadApi(params) {
  return service({
    url: '/admin/websocket/administrator/all/read',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function delApi(params) {
  return service({
    url: '/admin/websocket/administrator/delete',
    method: 'post',
    data: params
  })
}
