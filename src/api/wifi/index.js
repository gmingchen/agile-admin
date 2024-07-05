/*
 * @Description: 无线网
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-08-12 10:01:58
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
    url: '/admin/wifi/page',
    method: 'get',
    params: params
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: '/admin/wifi/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
