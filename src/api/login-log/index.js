import service from '@/utils/request'
import { download } from '@/utils'

/**
 * 分页
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/admin/log/login/page',
    method: 'get',
    params
  })
}

/**
 * 当前管理员最近登录日志列表
 * @returns
 */
export function latestApi() {
  return service({
    url: '/admin/log/login/latest',
    method: 'get'
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: '/admin/log/login/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}

