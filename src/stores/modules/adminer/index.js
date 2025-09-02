import { clearJson } from '@/common/utils'
import { loginInfoApi } from '@/apis/auth'

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
  actions: {
    /**
     * 获取当前用户信息
     * @returns
     */
    async getAdminer() {
      const r = await loginInfoApi()
      if (r) {
        this.$state = r.data
      }
      return r ? r.data : null
    },
    /**
     * 清除登录用户信息
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
