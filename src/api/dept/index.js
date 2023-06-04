import service from '@/utils/request'
import { download } from '@/utils'

/**
 * 列表
 * @param {*} params
 * @returns
 */
export function listApi(params) {
  return service({
    url: '/admin/dept/list',
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
    url: '/admin/dept/info',
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
    url: '/admin/dept/create',
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
    url: '/admin/dept/update',
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
    url: '/admin/dept/delete',
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
    url: '/admin/dept/status',
    method: 'post',
    data
  })
}

/**
 * 设置数据权限
 * @param {*} data
 * @returns
 */
export function setDataPermissionApi(data) {
  return service({
    url: '/admin/dept/data',
    method: 'post',
    data
  })
}

/**
 * 选择列表
 * @param {*} data
 * @returns
 */
export function selectApi(params) {
  return service({
    url: '/admin/dept/select',
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
    url: 'admin/dept/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
