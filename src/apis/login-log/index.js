import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 登录日志分页列表
 * @param {*} params
 * @returns
 */
export const loginLogPageApi = params => doGet('/admin/log/login/page', params)

/**
 * 登录日志最近列表(当前管理员)
 * @param {*} params
 * @returns
 */
export const loginLogLatestApi = params => doGet('/admin/log/login/latest', params)

/**
 * 登录日志导出
 * @param {*} params
 * @returns
*/
export const loginLogExportApi = params => doGetBlob('/admin/log/login/export', params)
