/*
 * @Description: Demo统计
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 查询最近一周访问量
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function weeklyVisitsApi() {
  return service({
    url: '/backstage/weekly/visits',
    method: 'get'
  })
}
