import { clearJson } from '@/common/utils'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    loaded: false,
    permissions: [],
    permissionValues: [],
  }),
  actions: {
    clear() {
      clearJson(this.$state)
      this.loaded = false
    }
  }
})
