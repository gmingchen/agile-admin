import { selfNoticeUnreadPageApi, selfNoticeSetStatusApi } from '@/apis'

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    list: [],
    page: {
      current: 1,
      size: 10,
      total: 0
    }
  }),
  actions: {
    async getData() {
      const params = { current: this.page.current, size: this.page.size }
      const r = await selfNoticeUnreadPageApi(params)
      if (r) {
        if (this.page.current === 1) {
          this.list = r.data.list
        } else {
          this.list.push(...r.data.list)
        }
        this.page.total = r.data.total
      }
      return r
    },
    async setRead(ids) {
      const params = { keys: ids }
      const r = await selfNoticeSetStatusApi(params)
      if (r) {
        this.page.current = 1
        this.getData()
      }
    },
    /**
     * 清除数据
     */
    clear() {
      this.list = []
      this.page.current = 1
      this.page.total = 0
    }
  }
})
