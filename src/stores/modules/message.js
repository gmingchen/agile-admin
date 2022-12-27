import { defineStore } from 'pinia'

import { unreadPageApi, setReadApi, setAllReadApi } from '@/api/websocket-administrator'

export const useMessageStore = defineStore('message', {
  state: () => ({
    list: [],
    page: {
      current: 1,
      size: 20,
      total: 0
    }
  }),
  getters: {},
  actions: {
    /**
     * 获取未读消息
     * @returns
     */
    async getList() {
      const { current, size } = this.page
      const params = { current, size }
      const r = await unreadPageApi(params)
      if (r) {
        this.list = r.data.list
        this.page.total = r.data.total
      }
      return r
    },
    /**
     * 设置已读
     * @param {*} ids 管理员 推送消息关联ID
     */
    async read(ids) {
      const params = {
        keys: ids
      }
      const r = await setReadApi(params)
      if (r) {
        this.getList()
      }
    },
    /**
     * 设置全部已读
     */
    async readAll() {
      const r = await setAllReadApi()
      if (r) {
        this.getList()
      }
    },
    /**
     * 清除数据
     */
    clear() {
      this.list = []
      this.page.total = 0
    }
  }
})
