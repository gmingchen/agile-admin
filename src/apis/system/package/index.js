import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 套餐分页列表
 * @param {*} params
 * @returns
 */
export const packagePageApi = params => doGet('/admin/package/page', params)

/**
 * 套餐详情
 * @param {*} params
 * @returns
*/
export const packageInfoApi = params => doGet('/admin/package/info', params)

/**
 * 套餐新增
 * @param {*} params
 * @returns
*/
export const packageCreateApi = params => doJson('/admin/package/create', params)

/**
 * 套餐修改
 * @param {*} params
 * @returns
*/
export const packageUpdateApi = params => doJson('/admin/package/update', params)

/**
 * 套餐删除
 * @param {*} params
 * @returns
*/
export const packageDeleteApi = params => doJson('/admin/package/delete', params)

/**
 * 套餐状态设置
 * @param {*} params
 * @returns
*/
export const packageSetStatusApi = params => doJson('/admin/package/status', params)

/**
 * 套餐导出
 * @param {*} params
 * @returns
*/
export const packageExportApi = params => doGetBlob('/admin/package/export', params)

/**
 * 套餐选择分页列表
 * @param {*} params
 * @returns
*/
export const packageSelectListApi = params => doGet('/admin/package/select', params)
