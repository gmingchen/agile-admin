/*
 * @Description: IP地址
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-06-03 15:28:12
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
    url: '/admin/ip/page',
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
    url: 'admin/ip/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
