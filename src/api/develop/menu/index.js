/*
 * @Description: 菜单权限
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:45:34
 */
import service from '@/utils/request'

/**
 * @description: 列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function listApi(params) {
  return service({
    url: '/backstage/menu/list',
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
    url: `/backstage/menu/info/${ params }`,
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
    url: '/backstage/menu/create',
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
    url: '/backstage/menu/update',
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
export function delApi(params) {
  return service({
    url: '/backstage/menu/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否显示
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function displayApi(params) {
  return service({
    url: '/backstage/menu/display',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否缓存
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function aliveApi(params) {
  return service({
    url: '/backstage/menu/alive',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否显示在标签栏
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function tabApi(params) {
  return service({
    url: '/backstage/menu/tab',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否在标签栏多开
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function multipleApi(params) {
  return service({
    url: '/backstage/menu/multiple',
    method: 'post',
    data: params
  })
}

/**
 * @description: 下拉列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selectListApi() {
  return service({
    url: '/backstage/menu/select',
    method: 'get'
  })
}

/**
 * @description: 当前用户下拉列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selfSelectListApi() {
  return service({
    url: '/backstage/menu/self/select',
    method: 'get'
  })
}
