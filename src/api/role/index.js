import service from '@/utils/request'
import { download } from '@/utils'

/**
 * 分页
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/admin/role/page',
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
    url: '/admin/role/info',
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
    url: '/admin/role/create',
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
    url: '/admin/role/update',
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
    url: '/admin/role/delete',
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
    url: '/admin/role/status',
    method: 'post',
    data
  })
}

/**
 * 设置菜单权限
 * @param {*} data
 * @returns
 */
export function setMenuPermissionApi(data) {
  return service({
    url: '/admin/role/menu',
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
    url: '/admin/role/data',
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
    url: '/admin/role/select',
    method: 'get'
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: 'admin/role/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
