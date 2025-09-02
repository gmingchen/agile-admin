import { useAuthStore } from './auth'
import { useAdminerStore } from './adminer'
import { usePermissionStore } from './permission'
import { useMenuStore } from './menu'
import { useSystemStore } from './system'
import { useDictStore } from './dict'

const useRootStore = defineStore('root', {
  state: () => ({}),
  actions: {
    clear() {
      useAdminerStore().clear()
      usePermissionStore().clear()
      useMenuStore().clear()
      useDictStore().clear()
    },
    logout() {
      useAuthStore().logout()
      this.clear()
    }
  }
})

export {
  useAuthStore,
  useAdminerStore,
  usePermissionStore,
  useMenuStore,
  useSystemStore,
  useDictStore,
  useRootStore,
}
