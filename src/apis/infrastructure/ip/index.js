import { doGet, doGetBlob } from '@/common/utils'

/**
 * IP分页列表
 * @param {*} params
 * @returns
 */
export const ipPageApi = params => doGet('/admin/ip/page', params)

/**
 * IP导出
 * @param {*} params
 * @returns
*/
export const ipExportApi = params => doGetBlob('/admin/ip/export', params)
