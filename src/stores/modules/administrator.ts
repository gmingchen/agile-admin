import { defineStore } from 'pinia'

import { clearJson } from '@/utils/index'
import { clearToken, getToken, setToken } from '@/utils/storage'
import { loginApi, logoutApi, type LoginParams } from '@/api/login'
import { selfInfoApi } from '@/api/administrator'
import type { Administrator } from '@/types/administrator'
import type { Token } from '@/types/token'

interface AdministratorState {
  administrator: Administrator.Expand
  token: Token.Base
}
export const useAdministratorStore = defineStore('administrator', {
  state: (): AdministratorState => ({
    administrator: {
      id: null,
      username: '',
      nickname: '',
      avatar: '',
      mobile: '',
      email: '',
      sex: 2,
      status: 1,
      roles: [],
      supervisor: 0,
      enterprise_id: null,
      department_custom: '',
      department_id: null,
      department_name: '',
      department_permission: null
    },
    token: getToken()
  }),
  getters: {
    tokenVal: state => {
      return state.token.token
    }
  },
  actions: {
    /**
     * 登录
     * @param {*} params
     * @returns
     */
    async login(params: LoginParams) {
      const r = await loginApi(params)
      if (r) {
        setToken(JSON.stringify(r.data))
        this.token = r.data
      }
      return r
    },
    /**
     * 获取当前用户信息
     * @returns
     */
    async getAdministrator() {
      const r = await selfInfoApi()
      if (r) {
        this.administrator = r.data
      }
      return r
    },
    /**
     * 退出当前账户
     * @returns
     */
    async logout() {
      const r = await logoutApi()
      return r
    },
    /**
     * 清除登录用户信息
     */
    clearAdministrator() {
      clearJson(this.administrator)
    },
    /**
     * 清除登录用户凭证
     */
    clearToken() {
      clearJson(this.token)
      clearToken()
    }
  }
})
