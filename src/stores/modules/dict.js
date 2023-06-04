import axios from 'axios'
import { subSelectListApi } from '@/api/dict'
import { SUCCESS_CODE } from '../../utils/constant'

export const useDictStore = defineStore('dict', {
  state: () => ({
  }),
  actions: {
    async getDict(code) {
      const dict = this.$state[code]
      if (dict && JSON.stringify(dict) !== '{}') {
        return dict
      } else {
        const r = await subSelectListApi({ code })
        if (r) {
          const list = r.data.map(item => {
            return {
              value: /^[0-9]+.?[0-9]*$/.test(item.code) ? +item.code : item.code, // 判断是否是数字 如果是数字则用数字
              label: item.name
            }
          })
          this.$state[code] = list
          return list
        } else {
          return {}
        }
      }
    },
    async getDicts(...codes) {
      const result = {}
      const codeList = []

      codes.forEach(code => {
        const dict = this.$state[code]
        if (dict && JSON.stringify(dict) !== '{}') {
          result[code] = dict
        } else {
          codeList.push(code)
        }
      })

      const requests = []
      codeList.forEach(code => {
        requests.push(subSelectListApi({ code }))
      })
      if (requests.length) {
        const responses = await axios.all(requests)
        responses.forEach((r, index) => {
          if (r && SUCCESS_CODE.includes(r.code)) {
            const list = r.data.map(item => {
              return {
                value: /^[0-9]+.?[0-9]*$/.test(item.code) ? +item.code : item.code, // 判断是否是数字 如果是数字则用数字
                label: item.name
              }
            })
            const code = codeList[index]
            this.$state[code] = list
            result[code] = list
          }
        })
      }

      return result
    }
  }
})
