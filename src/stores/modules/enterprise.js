import { defineStore } from 'pinia'

import { selfInfoApi } from '@/api/enterprise'

export const useEnterpriseStore = defineStore('enterprise', {
  state: () => ({
    enterprise: {
      id: '',
      name: '',
      logo: ''
    }
  }),
  getters: {},
  actions: {
    /**
     * 获取当前用户所在企业的信息
     * @returns
     */
    async getEnterprise() {
      const r = await selfInfoApi()
      if (r) {
        this.enterprise = r.data
      }
      return r
    }
  }
})
