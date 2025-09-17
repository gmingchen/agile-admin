import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 数据源分页列表
 * @param {*} params
 * @returns
 */
export const dataSourcePageApi = params => doGet('/admin/datasource/page', params)

/**
 * 数据源详情
 * @param {*} params
 * @returns
*/
export const dataSourceInfoApi = params => doGet('/admin/datasource/info', params)

/**
 * 数据源新增
 * @param {*} params
 * @returns
*/
export const dataSourceCreateApi = params => doJson('/admin/datasource/create', params)

/**
 * 数据源修改
 * @param {*} params
 * @returns
*/
export const dataSourceUpdateApi = params => doJson('/admin/datasource/update', params)

/**
 * 数据源删除
 * @param {*} params
 * @returns
*/
export const dataSourceDeleteApi = params => doJson('/admin/datasource/delete', params)

/**
 * 数据源状态设置
 * @param {*} params
 * @returns
*/
export const dataSourceSetStatusApi = params => doJson('/admin/datasource/status', params)

/**
 * 数据源导出
 * @param {*} params
 * @returns
*/
export const dataSourceExportApi = params => doGetBlob('/admin/datasource/export', params)

/**
 * 数据源选择列表
 * @param {*} params
 * @returns
*/
export const dataSourceSelectListApi = params => doGet('/admin/datasource/select', params)
