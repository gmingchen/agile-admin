import { doGet, doJson } from '@/common/utils'

/**
 * 权限菜单分页列表
 * @param {*} params
 * @returns
 */
export const permissionListApi = params => doGet('/admin/menu/list', params)

/**
 * 权限菜单详情
 * @param {*} params
 * @returns
*/
export const permissionInfoApi = params => doGet('/admin/menu/info', params)

/**
 * 权限菜单新增
 * @param {*} params
 * @returns
*/
export const permissionCreateApi = params => doJson('/admin/menu/create', params)

/**
 * 权限菜单修改
 * @param {*} params
 * @returns
*/
export const permissionUpdateApi = params => doJson('/admin/menu/update', params)

/**
 * 权限菜单删除
 * @param {*} params
 * @returns
*/
export const permissionDeleteApi = params => doJson('/admin/menu/delete', params)

/**
 * 拖拽 更新 父级ID 和 排序
 * @param {*} params
 * @returns
*/
export const permissionDragApi = params => doJson('/admin/menu/drag', params)

/**
 * 权限菜单选择列表
 * @param {*} params
 * @returns
 */
export const permissionSelectListApi = params => doGet('/admin/menu/select', params)
