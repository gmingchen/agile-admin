import { subSelectListApi } from '@/api/dictionary'

export default {
  state: {
    map: {}
  },
  getters: {
    dictionary(state) {
      return state.map
    }
  },
  mutations: {
    SET_MAP: (state, map) => {
      state.map = { ...state.map, ...map }
    }
  },
  actions: {
    async getDictionary({ commit, state }, code) {
      if (state.map[code] && JSON.stringify(state.map[code]) !== '{}') {
        return state.map[code]
      } else {
        const r = await subSelectListApi(code)
        if (r) {
          const map = {}
          const arr = r.data.map(item => {
            return {
              value: /^[0-9]+.?[0-9]*$/.test(item.code) ? +item.code : item.code, // 判断是否是数字 如果是数字则用数字
              label: item.name
            }
          })
          map[code] = arr
          commit('SET_MAP', map)
          return state.map[code]
        } else {
          return {}
        }
      }
    }
  }
}
