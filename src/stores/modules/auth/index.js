import { loginApi, logoutApi } from '@/apis/auth'
import { clearJson } from '@/common/utils'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    adminerId: '',
    tenantId: '',
    token: '',
    expiredAt: ''
  }),
  actions: {
    /**
     * 登录
     * @param {*} params
     * @returns
     */
    async login(params) {
      const r = await loginApi(params)
      if (r) {
        this.$state = r.data
      }
      return r
    },
    /**
     * 退出登录
     */
    async logout() {
      const r = await logoutApi()
      this.clear()
      return r
    },
    /**
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
