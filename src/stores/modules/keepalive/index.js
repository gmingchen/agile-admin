import { findKeepaliveName } from '@/common/utils'
import { usePermissionStore } from '../permission'
import { useTabStore } from '../tab'

export const useKeepaliveStore = defineStore('keepalive', {
  state: () => ({}),
  getters: {
    keepalives: () => {
      const { permissions } = usePermissionStore()
      return findKeepaliveName(useTabStore().tabs, permissions)
    }
  },
})
