import service from '@/utils/request'
import { download } from '@/utils'

/**
 * 分页
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/admin/tenant/page',
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
    url: '/admin/tenant/info',
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
    url: '/admin/tenant/create',
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
    url: '/admin/tenant/update',
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
    url: '/admin/tenant/delete',
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
    url: '/admin/tenant/status',
    method: 'post',
    data
  })
}

/**
 * 选择分页
 * @param {*} params
 * @returns
 */
export function selectPageApi(params) {
  return service({
    url: '/admin/tenant/select/page',
    method: 'get',
    params
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: 'admin/tenant/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
