import { doGet, doJson } from '@/common/utils'

/**
 * 区域列表
 * @param {*} params
 * @returns
 */
export const regionListApi = params => doGet('/admin/region/list', params)

/**
 * 区域详情
 * @param {*} params
 * @returns
*/
export const regionInfoApi = params => doGet('/admin/region/info', params)

/**
 * 区域新增
 * @param {*} params
 * @returns
*/
export const regionCreateApi = params => doJson('/admin/region/create', params)

/**
 * 区域修改
 * @param {*} params
 * @returns
*/
export const regionUpdateApi = params => doJson('/admin/region/update', params)

/**
 * 区域删除
 * @param {*} params
 * @returns
*/
export const regionDeleteApi = params => doJson('/admin/region/delete', params)

/**
 * 区域选择列表
 * @param {*} params
 * @returns
*/
export const regionSelectListApi = params => doGet('/admin/region/select', params)
