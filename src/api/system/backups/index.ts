/*
 * @Description: 备份
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-24 09:56:53
 */
import service from '@U/request'
import { IObject } from '@/utils/index.type'
import store from '@/store'

/**
 * @description: 列表
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function pageList(params: IObject) {
  return service({
    url: '/admin/backups/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 备份
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function save() {
  return service({
    url: '/admin/backups/save',
    method: 'post'
  })
}

/**
 * @description: 恢复
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function recovery(params: number) {
  return service({
    url: '/admin/backups/recovery',
    method: 'post',
    data: params
  })
}

/**
 * @description: 下载
 * @param {IObject} params
 * @return {string}
 * @author: gumingchen
 */
export function download(id: number): string {
  let result: string = ''
  const options: IObject = {
    url: '/admin/backups/download',
    method: 'get',
    params: id
  }
  result = `${process.env.VUE_APP_BASE_API + options.url}/${options.params}?token=${store.getters['user/token']}`
  return result
}

/**
 * @description: 删除
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function del(params: number[]) {
  return service({
    url: '/admin/backups/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 清库
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function truncate() {
  return service({
    url: '/admin/backups/truncate',
    method: 'post'
  })
}
