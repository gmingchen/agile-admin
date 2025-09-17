import { doGet, doJson } from '@/common/utils'

/**
 * 字典分页列表
 * @param {*} params
 * @returns
 */
  export const dictListApi = params => doGet('/admin/dict/list', params)

/**
 * 字典详情
 * @param {*} params
 * @returns
*/
export const dictInfoApi = params => doGet('/admin/dict/info', params)

/**
 * 字典新增
 * @param {*} params
 * @returns
*/
export const dictCreateApi = params => doJson('/admin/dict/create', params)

/**
 * 字典修改
 * @param {*} params
 * @returns
*/
export const dictUpdateApi = params => doJson('/admin/dict/update', params)

/**
 * 字典删除
 * @param {*} params
 * @returns
*/
export const dictDeleteApi = params => doJson('/admin/dict/delete', params)

/* ************************************************************************************************ */

/**
 * 字典副表列表
 * @param {*} params
 * @returns
 */
export const dictSubListApi = params => doGet('/admin/dict/sub/list', params)

/**
 * 字典副表详情
 * @param {*} params
 * @returns
 */
export const dictSubInfoApi = params => doGet('/admin/dict/sub/info', params)

/**
 * 字典副表新增
 * @param {*} params
 * @returns
 */
export const dictSubCreateApi = params => doJson('/admin/dict/sub/create', params)

/**
 * 字典副表修改
 * @param {*} params
 * @returns
 */
export const dictSubUpdateApi = params => doJson('/admin/dict/sub/update', params)

/**
 * 字典副表删除
 * @param {*} params
 * @returns
 */
export const dictSubDeleteApi = params => doJson('/admin/dict/sub/delete', params)

/**
 * 字典副表状态设置
 * @param {*} params
 * @returns
 */
export const dictSubSetStatusApi = params => doJson('/admin/dict/sub/status', params)

/**
 * 字典副表选择列表
 * @param {*} params
 * @returns
 */
export const dictSubSelectListApi = params => doJson('/admin/dict/sub/select/list', params)

