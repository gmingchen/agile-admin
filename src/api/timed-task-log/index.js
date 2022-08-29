/*
 * @Description: 定时任务日志
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 分页
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/quartz/task/log/page',
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
    url: `/quartz/task/log/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 清空所有日志
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function truncateApi() {
  return service({
    url: `/quartz/task/log/truncate`,
    method: 'post'
  })
}
