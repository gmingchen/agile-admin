import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 管理员分页列表
 * @param {*} params
 * @returns
 */
export const adminerPageApi = params => doGet('/admin/adminer/page', params)

/**
 * 管理员详情
 * @param {*} params
 * @returns
*/
export const adminerInfoApi = params => doGet('/admin/adminer/info', params)

/**
 * 管理员新增
 * @param {*} params
 * @returns
*/
export const adminerCreateApi = params => doJson('/admin/adminer/create', params)

/**
 * 管理员修改
 * @param {*} params
 * @returns
*/
export const adminerUpdateApi = params => doJson('/admin/adminer/update', params)

/**
 * 管理员删除
 * @param {*} params
 * @returns
*/
export const adminerDeleteApi = params => doJson('/admin/adminer/delete', params)

/**
 * 管理员状态设置
 * @param {*} params
 * @returns
*/
export const adminerSetStatusApi = params => doJson('/admin/adminer/status', params)

/**
 * 管理员导出
 * @param {*} params
 * @returns
*/
export const adminerExportApi = params => doGetBlob('/admin/adminer/export', params)

/**
 * 管理员选择列表
 * @param {*} params
 * @returns
*/
export const adminerSelectListApi = params => doGet('/admin/adminer/select', params)

/**
 * 管理员角色设置
 * @param {*} params
 * @returns
*/
export const adminerSetRoleApi = params => doJson('/admin/adminer/role', params)

/**
 * 管理员密码重置
 * @param {*} params
 * @returns
 */
export const adminerResetPasswordApi = params => doJson('/admin/adminer/reset', params)
