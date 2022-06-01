/*
 * @Description: 数据字典
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function listApi() {
  return service({
    url: '/backstage/dictionary/list',
    method: 'get'
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
    url: `/backstage/dictionary/info/${ params }`,
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
    url: `/backstage/dictionary/create`,
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
    url: `/backstage/dictionary/update`,
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
    url: `/backstage/dictionary/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 设置是否启用
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function setStatusApi(params) {
  return service({
    url: `/backstage/dictionary/status`,
    method: 'post',
    data: params
  })
}

/* --------------------------------------附表--------------------------------------- */

/**
 * @description: 列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function subListApi(params) {
  return service({
    url: `/backstage/dictionary/sub/list`,
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
export function subInfoApi(params) {
  return service({
    url: `/backstage/dictionary/sub/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function subAddApi(params) {
  return service({
    url: `/backstage/dictionary/sub/create`,
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
export function subEditApi(params) {
  return service({
    url: `/backstage/dictionary/sub/update`,
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
export function subDeleteApi(params) {
  return service({
    url: `/backstage/dictionary/sub/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 设置是否启用
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function subSetStatusApi(params) {
  return service({
    url: `/backstage/dictionary/sub/status`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function subSelectListApi(params) {
  return service({
    url: `/backstage/dictionary/sub/select/list/${ params }`,
    method: 'get'
  })
}
