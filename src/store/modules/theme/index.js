/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { selfInfoApi } from '@/api/enterprise'

const defaultTheme = {
  color: {
    primary: '',
    success: '',
    warning: '',
    danger: '',
    error: '',
    info: ''
  },
  text: {
    primary: '',
    regular: '',
    secondary: '',
    placeholder: '',
    disabled: ''
  },
  menu: {
    backgroundColor: '',
    textColor: '',
    activeTextColor: ''
  }
}

export default {
  state: {
    theme: defaultTheme
  },
  getters: {
  },
  mutations: {
    SET_ENTERPRISE: (state, enterprise) => {
      state.enterprise = enterprise
    }
  },
  actions: {
    /**
     * 获取当前用户信息
     * @returns
     */
    getTheme({ commit }) {
      const el = document.querySelector(':root')
      console.log(getComputedStyle(el).getPropertyValue('--el-color-primary'))
    }
  }
}
