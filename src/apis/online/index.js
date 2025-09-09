import { doGet, doJson } from '@/common/utils'

/**
 * 在线分页列表
 * @param {*} params
 * @returns
 */
export const onlinePageApi = params => doGet('/admin/online/page', params)

/**
 * 在线选择列表
 * @param {*} params
 * @returns
*/
export const onlineLogoutApi = params => doJson('/admin/online/logout', params)
