/*
 * @Description: 数据字典-副表
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-11-22 10:22:48
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-11-22 10:22:48
 */
import service from '@/utils/request'

/**
 * @description: 列表
 * @param {*}
 * @return {*}
 * @Author: gumingchen
 */
export function listApi(params) {
  return service({
    url: '/backstage/dictionary/detail/list',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 * @Author: gumingchen
 */
export function infoApi(params) {
  return service({
    url: `/backstage/dictionary/detail/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @Author: gumingchen
 */
export function addApi(params) {
  return service({
    url: '/backstage/dictionary/detail/create',
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {*}
 * @return {*}
 * @Author: gumingchen
 */
export function editApi(params) {
  return service({
    url: '/backstage/dictionary/detail/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*}
 * @Author: gumingchen
 */
export function delApi(params) {
  return service({
    url: '/backstage/dictionary/detail/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 字典编码查询字典详情列表
 * @param {*}
 * @return {*}
 * @Author: gumingchen
 */
export function selectListApi(params) {
  return service({
    url: `/backstage/dictionary/detail/select/${ params }`,
    method: 'get'
  })
}
