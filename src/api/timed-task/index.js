/*
 * @Description: 定时任务
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
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
    url: '/quartz/task/page',
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
    url: `/quartz/task/info/${ params }`,
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
    url: `/quartz/task/create`,
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
    url: `/quartz/task/update`,
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
    url: `/quartz/task/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 立即执行
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function runApi(params) {
  return service({
    url: `/quartz/task/run`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 恢复
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function resumeApi(params) {
  return service({
    url: `/quartz/task/resume`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 暂停
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pauseApi(params) {
  return service({
    url: `/quartz/task/pause`,
    method: 'post',
    data: params
  })
}
