/*
 * @Description: 消息通知（站内通知）
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-05-15 17:24:38
 */
import service from '..'
import { download } from '@utils'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 */
export function pageApi(params) {
  return service({
    url: '/admin/notice/page',
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
    url: '/admin/notice/delete',
    method: 'post',
    data
  })
}

/**
 * @description: 推送
 * @param {*}
 * @return {*}
 */
export function pushApi(data) {
  return service({
    url: '/admin/notice/push',
    method: 'post',
    data
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: 'admin/notice/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
