/*
 * @Description: 定时任务
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-26 17:00:43
 */
import service from '@U/request'
import { IObject } from '@/utils/index.type'

/**
 * @description: 列表
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function pageList(params: IObject) {
  return service({
    url: '/admin/schedule/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 详情
 * @param {number} params
 * @return {*}
 * @author: gumingchen
 */
export function info (params: number) {
  return service({
    url: `/admin/schedule/info/${params}`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {IObject}
 * @return {*}
 * @author: gumingchen
 */
export function save(params: IObject) {
  return service({
    url: '/admin/schedule/save',
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {IObject}
 * @return {*}
 * @author: gumingchen
 */
export function edit(params: IObject) {
  return service({
    url: '/admin/schedule/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {number[]} params
 * @return {*}
 * @author: gumingchen
 */
export function del(params: number[]) {
  return service({
    url: '/admin/schedule/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 暂停
 * @param {number[]} params
 * @return {*}
 * @author: gumingchen
 */
export function pause(params: number[]) {
  return service({
    url: '/admin/schedule/pause',
    method: 'post',
    data: params
  })
}

/**
 * @description: 恢复
 * @param {number[]} params
 * @return {*}
 * @author: gumingchen
 */
export function resume(params: number[]) {
  return service({
    url: '/admin/schedule/resume',
    method: 'post',
    data: params
  })
}

/**
 * @description: 执行
 * @param {number[]} params
 * @return {*}
 * @author: gumingchen
 */
export function run(params: number[]) {
  return service({
    url: '/admin/schedule/run',
    method: 'post',
    data: params
  })
}

/**
 * @description: 日志列表
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function logPageList(params: IObject) {
  return service({
    url: '/admin/scheduleLog/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 日志详情
 * @param {number} params
 * @return {*}
 * @author: gumingchen
 */
export function logInfo (params: number) {
  return service({
    url: `/admin/scheduleLog/info/${params}`,
    method: 'get'
  })
}
