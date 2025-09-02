import { PERMISSION_TYPE_ENUM } from '@/common/enums'
import { clearJson } from '@/common/utils'
import { filterMenus } from '@/permission'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [],
    active: '',
    collapse: false,
  }),
  getters: {
    showMenus: state => filterMenus(state.menus, item => item.show && item.type !== PERMISSION_TYPE_ENUM.BUTTON),
    keepaliveMenus: state => filterMenus(state.menus, item => item.keepalive)
  },

  actions: {
    clear() {
      clearJson(this.$state)
      this.collapse = false
    }
  }
})
