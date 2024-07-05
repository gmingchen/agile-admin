/*
 * @Description: 管理员-通知
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-05-15 17:24:38
 */
import service from '..'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 */
export function pageApi(params) {
  return service({
    url: '/admin/adminer/notice/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 */
export function unreadPageApi(params) {
  return service({
    url: '/admin/adminer/notice/unread/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return {*}
 */
export function deleteApi(data) {
  return service({
    url: '/admin/adminer/notice/delete',
    method: 'post',
    data
  })
}

/**
 * @description: 设置已读
 * @param {*}
 * @return {*}
 */
export function statusApi(data) {
  return service({
    url: '/admin/adminer/notice/status',
    method: 'post',
    data
  })
}
