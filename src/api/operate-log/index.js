import service from '..'
import { download } from '@utils'

/**
 * 分页
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/admin/log/operate/page',
    method: 'get',
    params
  })
}

/**
 * 当前管理员最近操作日志列表
 * @returns
 */
export function latestApi() {
  return service({
    url: '/admin/log/operate/latest',
    method: 'get'
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: 'admin/log/operate/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
