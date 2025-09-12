import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 异常日志分页列表
 * @param {*} params
 * @returns
 */
export const errorLogPageApi = params => doGet('/admin/log/error/page', params)

/**
 * 异常日志详情
 * @param {*} params
 * @returns
*/
export const errorLogInfoApi = params => doGet('/admin/log/error/info', params)

/**
 * 异常日志导出
 * @param {*} params
 * @returns
*/
export const errorLogExportApi = params => doGetBlob('/admin/log/error/export', params)
