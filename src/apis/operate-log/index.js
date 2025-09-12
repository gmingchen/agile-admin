import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 操作日志分页列表
 * @param {*} params
 * @returns
 */
export const operateLogPageApi = params => doGet('/admin/log/operate/page', params)

/**
 * 操作日志最近列表(当前管理员)
 * @param {*} params
 * @returns
 */
export const operateLogLatestApi = params => doGet('/admin/log/operate/latest', params)

/**
 * 操作日志导出
 * @param {*} params
 * @returns
*/
export const operateLogExportApi = params => doGetBlob('/admin/log/operate/export', params)
