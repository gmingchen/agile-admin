import { doGet, doJson, doBlob } from '@/common/utils'

/**
 * 租户分页列表
 * @param {*} params
 * @returns
 */
export const tenantPageApi = params => doGet('/admin/tenant/page', params)

/**
 * 租户详情
 * @param {*} params
 * @returns
*/
export const tenantInfoApi = params => doGet('/admin/tenant/info', params)

/**
 * 租户新增
 * @param {*} params
 * @returns
*/
export const tenantCreateApi = params => doJson('/admin/tenant/create', params)

/**
 * 租户修改
 * @param {*} params
 * @returns
*/
export const tenantUpdateApi = params => doJson('/admin/tenant/update', params)

/**
 * 租户删除
 * @param {*} params
 * @returns
*/
export const tenantDeleteApi = params => doJson('/admin/tenant/delete', params)

/**
 * 租户状态设置
 * @param {*} params
 * @returns
*/
export const tenantSetStatusApi = params => doJson('/admin/tenant/status', params)

/**
 * 租户导出
 * @param {*} params
 * @returns
*/
export const tenantExportApi = params => doBlob('/admin/tenant/export', params)

/**
 * 租户选择分页列表
 * @param {*} params
 * @returns
*/
export const tenantSelectPageApi = params => doGet('/admin/tenant/select/page', params)
