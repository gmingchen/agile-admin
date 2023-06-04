import { loginApi, logoutApi } from '@/api/auth'

import { getAuth, setAuth, clearAuth } from '@/utils/storage'
import { clearJson } from '@/utils'

const auth = getAuth()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    adminerId: '',
    tenantId: '',
    token: '',
    expiredAt: '',
    ...auth
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
        setAuth(r.data)
        this.$state = r.data
      }
      return r
    },
    /**
     * 退出登录
     */
    async logout() {
      const r = await logoutApi()
      return r.data
    },
    /**
     * 清除数据
     */
    clear() {
      clearAuth()
      clearJson(this.$state)
    }
  }
})
