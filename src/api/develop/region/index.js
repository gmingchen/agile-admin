/*
 * @Description: 全国区域级联
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-11-23 08:04:25
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-11-23 08:04:25
 */
import service from '@/utils/request'

/**
 * @description: 父级ID查询列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function listApi(params) {
  return service({
    url: `/backstage/region/list/${ params }`,
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
    url: `/backstage/region/info/${ params }`,
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
    url: '/backstage/region/create',
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
    url: '/backstage/region/update',
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
    url: '/backstage/region/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 下拉选择列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selectListApi(params) {
  return service({
    url: `/backstage/region/select/${ params }`,
    method: 'get'
  })
}
