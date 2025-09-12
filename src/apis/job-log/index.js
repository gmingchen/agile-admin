import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 定时任务分页列表
 * @param {*} params
 * @returns
 */
export const jobLogPageApi = params => doGet('/admin/log/job/page', params)

/**
 * 定时任务导出
 * @param {*} params
 * @returns
*/
export const jobLogExportApi = params => doGetBlob('/admin/log/job/export', params)
