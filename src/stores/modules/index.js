import { useAuthStore } from './auth'
import { useAdminerStore } from './adminer'
import { usePermissionStore } from './permission'
import { useMenuStore } from './menu'
import { useSystemStore } from './system'
import { useDictStore } from './dict'
import { useTabStore } from './tab'
import { useKeepaliveStore } from './keepalive'
import { useNoticeStore } from './notice'
import { useWebsocketStore } from './websocket'

const useRootStore = defineStore('root', {
  state: () => ({}),
  actions: {
    clear() {
      useAdminerStore().clear()
      usePermissionStore().clear()
      useMenuStore().clear()
      useDictStore().clear()
      useTabStore().clear()
      useNoticeStore().clear()
    },
    async logout() {
      try {
        await useAuthStore().logout()
      } catch (error) { }
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
  useTabStore,
  useKeepaliveStore,
  useNoticeStore,
  useWebsocketStore,
  useRootStore,
}
