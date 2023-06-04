/*
 * @Description: websocket推送消息
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2022-06-24 04:27:11
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-06-24 04:27:11
 */
import service from '@/utils/request'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/admin/websocket/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 推送企业消息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function createApi(params) {
  return service({
    url: '/admin/websocket/create',
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
    url: '/admin/websocket/delete',
    method: 'post',
    data: params
  })
}

// todo:------------------------------------------------------------------------------------

/**
 * @description: 推送系统消息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalcreateApi(params) {
  return service({
    url: '/admin/websocket/global/create',
    method: 'post',
    data: params
  })
}

/**
 * @description: 在线管理员分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function onlinePageApi(params) {
  return service({
    url: '/admin/websocket/online/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 强制管理员退出
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function logoutApi(params) {
  return service({
    url: '/admin/websocket/logout',
    method: 'post',
    data: params
  })
}
