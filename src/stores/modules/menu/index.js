import { clearJson } from '@/common/utils'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [],
    active: '',
    collapse: false,
  }),
  getters: {
  },
  actions: {
    clear() {
      clearJson(this.$state)
      this.collapse = false
    }
  }
})
