import router from '@/router'

// todo: ITab value 格式：{a}-{b}-{c}-{d}
// todo: a: 路由name b: 菜单ID c: 路由query字符串 d: 路由params字符串
// todo: c、d 支持多开的时候需要
const defaultTabs = [{
  value: 'home-home-{}-{}',
  label: '首页',
  name: 'home',
  path: '/home',
  query: {}, // 路由参数
  params: {}, // 路由参数
  closable: false, // true：可以关闭
  menuId: 'home'
}]

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    active: '',
    tabs: []
  }),
  getters: {},
  actions: {
    /**
     * 路由变化事件 设置当前选中、添加标签
     * @param {*} route
     */
    changeHandle(route) {
      const meta = route.meta
      let val = `${ route.name }-${ meta.id }`
      if (meta.tab) {
        if (meta.multiple) {
          const queryStr = JSON.stringify(route.query)
          const paramsStr = JSON.stringify(route.params)
          val += `-${ queryStr }-${ paramsStr }`
        } else {
          val += `-{}-{}`
        }
        // 如果不存在则添加
        if (this.tabs.every(item => item.value !== val)) {
          const tab = {
            value: val,
            menuId: meta.id,
            label: meta.label,
            name: route.name,
            path: route.path,
            query: route.query,
            params: route.params
          }
          this.tabs.push(tab)
        }
      }
      this.active = val
    },
    /**
     * 删除tabs
     * @param {*} values
     */
    removeHandle(values) {
      // 过滤出不用删除的标签页
      let tabs = this.tabs.filter(item => {
        return values.indexOf(item.value) === -1
      })
      // 至少保留一个标签页
      if (tabs.length === 0) {
        tabs = [this.tabs[0]]
      }
      // 若删除的包含当前页则跳转其他页
      if (tabs.every(item => item.value !== this.active)) {
        const tab = tabs[tabs.length - 1]
        router.push({
          name: tab.name,
          query: tab.query,
          params: tab.params
        })
      }
      // 设置当前未删除的标签页
      this.tabs = JSON.parse(JSON.stringify(tabs))
    },
    /**
     * 清除标签页
     */
    clear() {
      this.active = ''
      this.tabs = []
    }
  }
})
