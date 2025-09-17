export const useSystemStore = defineStore('system', {
  state: () => ({
    refresh: false,
  }),
  actions: {
    handleRefresh() {
      this.refresh = true
      nextTick(() => this.refresh = false)
    }
  }
})
