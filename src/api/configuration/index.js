/*
 * @Description: 系统配置
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2022-06-17 03:09:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-06-17 03:09:33
 */
import service from '@/utils/request'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/backstage/configuration/page',
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
    url: `/backstage/configuration/info/${ params }`,
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
    url: '/backstage/configuration/create',
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
    url: '/backstage/configuration/update',
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
    url: '/backstage/configuration/delete',
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
    url: '/backstage/configuration/status',
    method: 'post',
    data: params
  })
}

/**
 * @description: 编码查询列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function listApi(params) {
  return service({
    url: `/backstage/configuration/list/${ params }`,
    method: 'get'
  })
}
