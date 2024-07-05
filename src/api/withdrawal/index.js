/*
 * @Description: 提现
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-08-07 16:51:10
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
    url: '/admin/withdrawal/page',
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
    url: '/admin/withdrawal/delete',
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
    url: '/admin/withdrawal/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}

/**
 * @description: 审核
 * @param {*}
 * @return {*}
 */
export function reviewApi(data) {
  return service({
    url: '/admin/withdrawal/review',
    method: 'post',
    data
  })
}
