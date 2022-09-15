/*
 * @Description: 代码生成器
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'
import { download } from '@/utils'

/**
 * @description: 表格分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/generator/table/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 代码生成
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export async function generatorApi(params) {
  const r = await service({
    url: '/generator/create',
    method: 'post',
    responseType: 'blob',
    data: params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
