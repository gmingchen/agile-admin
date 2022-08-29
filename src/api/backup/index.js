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
    url: '/admin/backup/page',
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
export function backupApi() {
  return service({
    url: '/admin/backup/backup',
    method: 'post'
  })
}

/**
 * @description: 恢复
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function recoveryApi(params) {
  return service({
    url: '/admin/backup/recovery',
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
    url: '/admin/backup/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 更新配置
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function updateConfigApi(params) {
  return service({
    url: '/admin/backup/update/config',
    method: 'post',
    data: params
  })
}
