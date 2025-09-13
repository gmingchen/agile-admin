import { doGet, doJson } from '@/common/utils'

/**
 * 权限分页列表
 * @param {*} params
 * @returns
 */
export const permissionListApi = params => doGet('/admin/permission/list', params)

/**
 * 权限详情
 * @param {*} params
 * @returns
*/
export const permissionInfoApi = params => doGet('/admin/permission/info', params)

/**
 * 权限新增
 * @param {*} params
 * @returns
*/
export const permissionCreateApi = params => doJson('/admin/permission/create', params)

/**
 * 权限修改
 * @param {*} params
 * @returns
*/
export const permissionUpdateApi = params => doJson('/admin/permission/update', params)

/**
 * 权限删除
 * @param {*} params
 * @returns
*/
export const permissionDeleteApi = params => doJson('/admin/permission/delete', params)

/**
 * 拖拽 更新 父级ID 和 排序
 * @param {*} params
 * @returns
*/
export const permissionDragApi = params => doJson('/admin/permission/drag', params)

/**
 * 权限选择列表
 * @param {*} params
 * @returns
 */
export const permissionSelectListApi = params => doGet('/admin/permission/select', params)
