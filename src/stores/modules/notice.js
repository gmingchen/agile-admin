
import { unreadPageApi, statusApi } from '@/api/adminer-notice'

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    list: [],
    page: {
      current: 1,
      size: 10,
      total: -1
    }
  }),
  getters: {},
  actions: {
    /**
     * 获取未读消息
     * @returns
     */
    async getList(current) {
      if (current) {
        this.page.current = current
      }
      const params = {
        current: this.page.current,
        size: this.page.size
      }
      const r = await unreadPageApi(params)
      if (r) {
        if (current === 1) {
          this.list = r.data.list
        } else {
          this.list.push(...r.data.list)
        }
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
      const r = await statusApi(params)
      if (r) {
        this.page.current = 1
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
