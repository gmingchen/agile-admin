import service from '..'
import { download } from '@utils'

/**
 * 配置分页
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/admin/package/page',
    method: 'get',
    params
  })
}

/**
 * 详情
 * @param {*} params
 * @returns
 */
export function infoApi(params) {
  return service({
    url: '/admin/package/info',
    method: 'get',
    params
  })
}

/**
 * 新增
 * @param {*} data
 * @returns
 */
export function createApi(data) {
  return service({
    url: '/admin/package/create',
    method: 'post',
    data
  })
}

/**
 * 更新
 * @param {*} data
 * @returns
 */
export function updateApi(data) {
  return service({
    url: '/admin/package/update',
    method: 'post',
    data
  })
}

/**
 * 删除
 * @param {*} data
 * @returns
 */
export function deleteApi(data) {
  return service({
    url: '/admin/package/delete',
    method: 'post',
    data
  })
}

/**
 * 状态切换
 * @param {*} data
 * @returns
 */
export function setStatusApi(data) {
  return service({
    url: '/admin/package/status',
    method: 'post',
    data
  })
}

/**
 * 选择列表
 * @param {*} data
 * @returns
 */
export function selectApi() {
  return service({
    url: '/admin/package/select',
    method: 'get'
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: 'admin/package/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
