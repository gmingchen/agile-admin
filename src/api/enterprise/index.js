/*
 * @Description: 企业
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 获取当前管理员所在企业
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selfInfoApi() {
  return service({
    url: '/backstage/enterprise/self/info',
    method: 'get'
  })
}
