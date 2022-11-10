import { defineStore } from 'pinia'

import { selfInfoApi } from '@/api/enterprise'
import type { Enterprise } from '@/types/enterprise'

interface EnterpriseState {
  enterprise: Enterprise.Base
}

export const useEnterpriseStore = defineStore('enterprise', {
  state: (): EnterpriseState => ({
    enterprise: {
      id: null,
      name: '',
      logo: '',
      describe: '',
      status: 0
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
