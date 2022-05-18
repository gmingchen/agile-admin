/*
 * @Description: 企业菜单
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 获取当前管理员 菜单 权限
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selfInfoApi() {
  return service({
    url: '/backstage/enterprise/menu/self/info',
    method: 'get'
  })
}

/**
 * @description: 获取当前企业下所有菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function listApi() {
  return service({
    url: '/backstage/enterprise/menu/list',
    method: 'get'
  })
}

/**
 * @description: 修改企业菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function updateApi(params) {
  return service({
    url: '/backstage/enterprise/menu/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 获取管理员在该企业下的菜单权限 非树形 只包括名称 id
 *               超级管理员 返回所有 否则 返回该用户角色下面的所有
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selectListApi() {
  return service({
    url: '/backstage/enterprise/menu/select/list',
    method: 'get'
  })
}

// todo:------------------------------------------------------------------------------------

/**
 * @description: 企业ID获取企业下所有菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalListApi(params) {
  return service({
    url: `/backstage/enterprise/menu/global/list/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 企业ID获取企业下拥有的菜单ID数组
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalIdsApi(params) {
  return service({
    url: `/backstage/enterprise/menu/global/ids/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 编辑企业菜单权限 新增 移除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalModifyApi(params) {
  return service({
    url: '/backstage/enterprise/menu/global/modify',
    method: 'post',
    data: params
  })
}

/**
 * @description: 修改企业菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalUpdateApi(params) {
  return service({
    url: '/backstage/enterprise/menu/global/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除企业菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalDeleteApi(params) {
  return service({
    url: `/backstage/enterprise/menu/global/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 企业ID获取企业下所有的菜单权限
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalSelectListApi(params) {
  return service({
    url: `/backstage/enterprise/menu/global/select/list/${ params }`,
    method: 'get'
  })
}
