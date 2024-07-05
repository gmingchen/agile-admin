import service from '..'
import { download } from '@utils'

/**
 * 分页
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/admin/adminer/page',
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
    url: '/admin/adminer/info',
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
    url: '/admin/adminer/create',
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
    url: '/admin/adminer/update',
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
    url: '/admin/adminer/delete',
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
    url: '/admin/adminer/status',
    method: 'post',
    data
  })
}

/**
 * 设置角色
 * @param {*} data
 * @returns
 */
export function setRoleApi(data) {
  return service({
    url: '/admin/adminer/role',
    method: 'post',
    data
  })
}

/**
 * 重置密码
 * @param {*} data
 * @returns
 */
export function resetPasswordApi(data) {
  return service({
    url: '/admin/adminer/reset',
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
    url: '/admin/adminer/select',
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
    url: 'admin/adminer/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
