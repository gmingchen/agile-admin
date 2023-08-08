/*
 * @Description: 设置
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-08-07 15:18:46
 */
import service from '@/utils/request'

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 */
export function infoApi(params) {
  return service({
    url: '/admin/settings/info',
    method: 'get',
    params
  })
}

/**
 * @description: 更新
 * @param {*}
 * @return {*}
 */
export function updateApi(data) {
  return service({
    url: '/admin/settings/update',
    method: 'post',
    data
  })
}
