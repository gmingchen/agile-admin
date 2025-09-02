import { doGet, doJson, doBlob, doForm, parseJsonToParam } from '@/common/utils'

/**
 * 文件配置分页列表
 * @param {*} params
 * @returns
 */
export const fileConfigPageApi = params => doGet('/admin/file/config/page', params)

/**
 * 文件配置详情
 * @param {*} params
 * @returns
*/
export const fileConfigInfoApi = params => doGet('/admin/file/config/info', params)

/**
 * 文件配置新增
 * @param {*} params
 * @returns
*/
export const fileConfigCreateApi = params => doJson('/admin/file/config/create', params)

/**
 * 文件配置修改
 * @param {*} params
 * @returns
*/
export const fileConfigUpdateApi = params => doJson('/admin/file/config/update', params)

/**
 * 文件配置删除
 * @param {*} params
 * @returns
*/
export const fileConfigDeleteApi = params => doJson('/admin/file/config/delete', params)

/**
 * 文件配置设置主配置
 * @param {*} params
 * @returns
*/
export const fileConfigSetMasterApi = params => doJson('/admin/file/config/master', params)

/**
 * 文件配置导出
 * @param {*} params
 * @returns
*/
export const fileConfigExportApi = params => doBlob('/admin/file/config/export', params)

/**
 * 文件配置选择列表
 * @param {*} params
 * @returns
*/
export const fileConfigSelectListApi = params => doGet('/admin/file/config/select', params)

/* ***************************************************************************************** */

/**
 * 文件分页列表
 * @param {*} params
 * @returns
 */
export const filePageApi = params => doGet('/admin/file/page', params)

/**
 * 文件删除
 * @param {*} params
 * @returns
*/
export const fileDeleteApi = params => doJson('/admin/file/delete', params)

/* ***************************************************************************************** */

/**
 * 上传地址
 * @param {*} params
 * @returns
 */
export const uploadUrl = params =>  {
  return `/admin/file/upload${ params ? '?' + parseJsonToParam(params) : '' }`
}

/**
 * 上传
 * @param {*} params
 * @returns
 */
export const uploadApi = params => {
  return doForm(uploadUrl(), params)
}
