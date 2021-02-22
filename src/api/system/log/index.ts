/*
 * @Description: 日志
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-22 14:08:23
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
    url: '/admin/log/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 日志清理
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function truncate() {
  return service({
    url: '/admin/log/truncate',
    method: 'post'
  })
}
