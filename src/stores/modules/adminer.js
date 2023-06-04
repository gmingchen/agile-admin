import { clearJson } from '@/utils/index'

import { adminerInfoApi, logoutApi } from '@/api/auth'

export const useAdminerStore = defineStore('adminer', {
  state: () => ({
    id: '',
    username: '',
    nickname: '',
    avatar: '',
    mobile: '',
    email: '',
    sex: '',
    sex_dict: '',
    roles: '',
    posts: '',
    dept: '',
    tenant: '',
    token: '',
    expireAt: ''
  }),
  getters: {
  },
  actions: {
    /**
     * 获取当前用户信息
     * @returns
     */
    async getAdminer() {
      const r = await adminerInfoApi()
      if (r) {
        this.$state = r.data
      }
      return r.data
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
    clear() {
      clearJson(this.$state)
    }
  }
})
