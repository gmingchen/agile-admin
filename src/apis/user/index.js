import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 用户分页列表
 * @param {*} params
 * @returns
 */
export const userPageApi = params => doGet('/admin/user/page', params)

/**
 * 用户详情
 * @param {*} params
 * @returns
*/
export const userInfoApi = params => doGet('/admin/user/info', params)

/**
 * 用户新增
 * @param {*} params
 * @returns
*/
export const userCreateApi = params => doJson('/admin/user/create', params)

/**
 * 用户修改
 * @param {*} params
 * @returns
*/
export const userUpdateApi = params => doJson('/admin/user/update', params)

/**
 * 用户删除
 * @param {*} params
 * @returns
*/
export const userDeleteApi = params => doJson('/admin/user/delete', params)

/**
 * 用户状态设置
 * @param {*} params
 * @returns
*/
export const userSetStatusApi = params => doJson('/admin/user/status', params)

/**
 * 用户导出
 * @param {*} params
 * @returns
*/
export const userExportApi = params => doGetBlob('/admin/user/export', params)

/**
 * 用户选择列表
 * @param {*} params
 * @returns
*/
export const userSelectListApi = params => doGet('/admin/user/select', params)
