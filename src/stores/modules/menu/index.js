import { PERMISSION_TYPE_ENUM } from '@/common/enums'
import { clearJson } from '@/common/utils'
import { filterTree } from '@/permission'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [],
    active: '',
    collapse: false,
  }),
  getters: {
    keepaliveMenus: state => filterTree(state.menus, item => item.keepalive)
  },

  actions: {
    clear() {
      clearJson(this.$state)
      this.collapse = false
    }
  }
})
