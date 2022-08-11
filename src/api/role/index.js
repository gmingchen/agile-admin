/*
 * @Description: 企业角色
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 超级管理员获取当前企业下的所有角色 否则 获取当前管理员创建的角色
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/admin/role/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function infoApi(params) {
  return service({
    url: `/admin/role/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function addApi(params) {
  return service({
    url: `/admin/role/create`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function editApi(params) {
  return service({
    url: `/admin/role/update`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function deleteApi(params) {
  return service({
    url: `/admin/role/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 设置是否显示
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function setShowApi(params) {
  return service({
    url: `/admin/role/show`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 获取管理员创建的角色 超级管理员获取企业下所有的角色
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selectListApi() {
  return service({
    url: `/admin/role/select/list`,
    method: 'get'
  })
}

// todo:------------------------------------------------------------------------------------

/**
 * @description: 企业ID获取企业下所有角色
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalPageApi(params) {
  return service({
    url: '/admin/role/global/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalInfoApi(params) {
  return service({
    url: `/admin/role/global/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalAddApi(params) {
  return service({
    url: `/admin/role/global/create`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalEditApi(params) {
  return service({
    url: `/admin/role/global/update`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalDeleteApi(params) {
  return service({
    url: `/admin/role/global/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 设置是否显示
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalSetShowApi(params) {
  return service({
    url: `/admin/role/global/show`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 获取企业下所有的角色
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalSelectListApi(params) {
  return service({
    url: `/admin/role/global/select/list/${ params }`,
    method: 'get'
  })
}
