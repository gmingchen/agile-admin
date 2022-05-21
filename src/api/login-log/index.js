/*
 * @Description: 登录日志
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 当前管理员 分页
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selfPageApi(params) {
  return service({
    url: '/backstage/log/login/self/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 分页
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/backstage/log/login/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 删除 所有日志
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function deleteApi() {
  return service({
    url: `/backstage/log/login/delete`,
    method: 'post'
  })
}

// todo:------------------------------------------------------------------------------------

/**
 * @description: 企业ID 企业下所有操作日志分页
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalPageApi(params) {
  return service({
    url: '/backstage/log/login/global/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 企业ID 删除企业下所有日志
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalDeleteApi(params) {
  return service({
    url: `/backstage/log/login/global/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 清空所有企业日志
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function globalTruncateApi() {
  return service({
    url: `/backstage/log/login/global/truncate`,
    method: 'post'
  })
}
