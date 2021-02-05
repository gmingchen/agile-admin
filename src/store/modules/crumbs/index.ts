/*
 * @Description: 面包屑
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-16 14:50:54
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-05 13:43:41
 */
import { ICrumb, ICrumbs } from './index.type'

export default {
  namespaced: true,
  state: {
    // 分隔符
    separator: '/',
    // 图标分隔符
    separatorClass: '',
    // 面包屑
    crumbList: [
      {
        id: 0,
        title: '首页',
        to: {
          name: 'layout'
        },
        replace: false
      }
    ]
  },
  getters: {
    separator: (state: ICrumbs): string => state.separator,
    separatorClass: (state: ICrumbs): string => state.separatorClass,
    crubsList: (state: ICrumbs): Array<ICrumb> => state.crumbList
  },
  mutations: {
    SET_CRUMB_LIST: (state: ICrumbs, crumbList: Array<ICrumb>): void => {
      state.crumbList = crumbList
    }
  },
  actions: {
    setCrumbList({ commit }, crumbList: Array<ICrumb>): void {
      commit('SET_CRUMB_LIST', crumbList)
    }
  }
}
