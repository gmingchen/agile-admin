import { clearJson } from '@/common/utils'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    loaded: false,
    permissions: [],
  }),
  actions: {
    clear() {
      clearJson(this.$state)
      this.loaded = false
    }
  }
})
