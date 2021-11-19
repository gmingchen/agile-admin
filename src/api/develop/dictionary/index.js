/*
 * @Description: 数据字典-主表
 * @Author: slipper
 * @Email: 1240235512@qq.com
 * @Date: 2021-11-19 04:53:51
 * @LastEditors: slipper
 * @LastEditTime: 2021-11-19 04:53:51
 */
import service from '@/utils/request'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: slipper
 */
export function pageApi(params) {
  return service({
    url: '/backstage/dictionary/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 * @author: slipper
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
 * @author: slipper
 */
export function addApi(params) {
  return service({
    url: '/backstage/dictionary/create',
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {*}
 * @return {*}
 * @author: slipper
 */
export function editApi(params) {
  return service({
    url: '/backstage/dictionary/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*}
 * @author: slipper
 */
export function delApi(params) {
  return service({
    url: '/backstage/dictionary/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 状态切换
 * @param {*} params
 * @return {*}
 * @author: slipper
 */
export function statusApi(params) {
  return service({
    url: '/backstage/dictionary/status',
    method: 'post',
    data: params
  })
}
