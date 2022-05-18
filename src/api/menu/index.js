/*
 * @Description: 菜单
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 获取所有菜单 权限
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selectListApi() {
  return service({
    url: '/backstage/menu/select/list',
    method: 'get'
  })
}
