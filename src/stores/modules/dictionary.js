import { defineStore } from 'pinia'

import { subSelectListApi } from '@/api/dictionary'

export const useDictionaryStore = defineStore('dictionary', {
  state: () => ({
    dictionary: {}
  }),
  getters: {},
  actions: {
    /**
     * 获取字典
     * @param {String} code 键值
     * @returns
     */
    async getDictionary(code) {
      if (this.dictionary[code] && JSON.stringify(this.dictionary[code]) !== '{}') {
        return this.dictionary[code]
      } else {
        const r = await subSelectListApi(code)
        if (r) {
          const arr = r.data.map(item => {
            return {
              value: /^[0-9]+.?[0-9]*$/.test(item.code) ? +item.code : item.code, // 判断是否是数字 如果是数字则用数字
              label: item.name
            }
          })
          this.dictionary[code] = arr
          return this.dictionary[code]
        } else {
          return {}
        }
      }
    }
  }
})
