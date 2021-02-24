/*
 * @Description: 代码生成
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-24 10:09:52
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
    url: '/admin/generator/table/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 下载
 * @param {IObject} params
 * @return {string}
 * @author: gumingchen
 */
export function create(params: string[]) {
  return service({
    url: '/admin/generator/table/create',
    method: 'post',
    data: params
  })
}
