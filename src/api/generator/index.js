import service from '..'
import { download } from '@utils'

/**
 * @description: 表格分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/admin/generator/page',
    method: 'get',
    params
  })
}

/**
 * @description: 代码生成
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export async function generateApi(data) {
  const r = await service({
    url: '/admin/generator/generate',
    method: 'post',
    responseType: 'blob',
    data
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
