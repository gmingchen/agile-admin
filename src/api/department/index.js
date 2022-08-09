/*
 * @Description: 部门
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2022-08-08 05:22:22
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-08-08 05:22:22
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
    url: '/backstage/department/list',
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
    url: `/backstage/department/info/${ params }`,
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
    url: '/backstage/department/create',
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
    url: '/backstage/department/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function delApi(params) {
  return service({
    url: '/backstage/department/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 状态切换
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function statusApi(params) {
  return service({
    url: '/backstage/department/status',
    method: 'post',
    data: params
  })
}

/**
 * @description: 部门列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selectListApi(params) {
  return service({
    url: '/backstage/department/select/list',
    method: 'get',
    params: params
  })
}

// todo:------------------------------------------------------------------------------------

/**
 * @description: 部门列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalSelectListApi(params) {
  return service({
    url: '/backstage/department/global/select/list',
    method: 'get',
    params: params
  })
}
