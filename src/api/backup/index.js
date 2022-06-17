/*
 * @Description: 备份
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2022-06-17 04:43:51
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-06-17 04:43:51
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
    url: '/backstage/backup/page',
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
    url: `/backstage/backup/info/${ params }`,
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
    url: '/backstage/backup/create',
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
    url: '/backstage/backup/update',
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
    url: '/backstage/backup/delete',
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
    url: '/backstage/backup/status',
    method: 'post',
    data: params
  })
}
