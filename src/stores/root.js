import { defineStore } from 'pinia'
import { ElLoading } from 'element-plus'

import { useAdministratorStore } from './modules/administrator'
import { useMenuStore } from './modules/menu'
import { useTabsStore } from './modules/tabs'
import { useThemeStore } from './modules/theme'
import { useSettingsStore } from './modules/settings'

export const useRootStore = defineStore('root', {
  state: () => ({}),
  getters: {},
  actions: {
    /**
     * 清除数据 用户信息 菜单 权限 标签页 主题
     * @param {*}
     */
    clearData() {
      useAdministratorStore().clearAdministrator()
      useMenuStore().clear()
      useTabsStore().clear()
    },
    /**
     * 清除缓存
     * @returns
     */
    clear() {
      ElLoading.service({
        lock: true,
        text: '清理缓存...',
        background: 'rgba(0, 0, 0, 0.3)'
      })
      this.clearData()
      useThemeStore().clear()
      useSettingsStore().clear()
      window.location.reload()
    },
    /**
     * 退出登录清除 用户信息 菜单 权限 登录凭证
     * @param {*} param0
     */
    logout() {
      this.clearData()
      useAdministratorStore().clearToken()
    }
  }
})
