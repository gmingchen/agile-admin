import { subSelectListApi } from '@/api/dict'

/**
 * 处理数据
 * @param {*} data
 * @returns
 */
const dictHandle = (data) => {
  const result = {}
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const dict = data[key]
      const list = dict.map(item => {
        return {
          value: /^[0-9]+.?[0-9]*$/.test(item.code) ? +item.code : item.code, // 判断是否是数字 如果是数字则用数字
          label: item.name
        }
      })
      result[key] = list
    }
  }
  return result
}

export const useDictStore = defineStore('dict', {
  state: () => ({
  }),
  actions: {
    async getDict(code) {
      const dict = this.$state[code]
      if (dict && JSON.stringify(dict) !== '{}') {
        return dict
      } else {
        const r = await subSelectListApi([code])
        if (r) {
          const data = dictHandle(r.data)
          this.$state[code] = data[code]
          return data[code]
        } else {
          return []
        }
      }
    },
    async getDicts(...codes) {
      let result = {}
      const codeList = []

      codes.forEach(code => {
        const dict = this.$state[code]
        if (dict && JSON.stringify(dict) !== '{}') {
          result[code] = dict
        } else {
          codeList.push(code)
        }
      })
      if (codeList.length) {
        const r = await subSelectListApi(codeList)
        if (r) {
          const data = dictHandle(r.data)
          this.$state = { ...this.$state, ...data }
          result = { ...result, ...data }
        }
      }
      return result
    }
  }
})
