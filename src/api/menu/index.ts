/*
 * @Description: 菜单
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import type { IAxios } from '@/types'
import type { Menu } from '@/types/menu'
import service from '@/utils/request'

interface dragParams {
  id: number
  parent_id: number
  sort_ids: number[]
}

/**
 * @description: 获取所有菜单 权限
 * @return {*}
 * @author: gumingchen
 */
export function selectListApi(): Promise<IAxios.ResponseData<Menu.Simple[]>> {
  return service({
    url: '/admin/menu/select/list',
    method: 'get'
  })
}

/**
 * @description: 信息
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function infoApi(params: number): Promise<IAxios.ResponseData<Menu.Base>> {
  return service({
    url: `/admin/menu/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function addApi(params: Menu.Base): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/menu/create`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function editApi(params: Menu.Base): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/menu/update`,
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
export function deleteApi(params: number[]) {
  return service({
    url: `/admin/menu/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 拖拽 更新 父级ID 和 排序
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function dragApi(params: dragParams): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/menu/drag`,
    method: 'post',
    data: params
  })
}
