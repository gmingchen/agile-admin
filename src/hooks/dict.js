import { delay } from '@utils'

// 页面多次复用组件第一次会重复请求处理
const pending = {}

export default function () {
  const dictStore = useDictStore()

  const dict = ref([])
  const dicts = ref({})

  const getDict = async (code) => {
    while (pending[code] === 1) {
      await delay()
    }

    pending[code] = 1
    const result = await dictStore.getDict(code)
    dict.value = result
    pending[code] = 0
    return result
  }

  const getDicts = async (...codes) => {
    while (codes.some(code => pending[code] === 1)) {
      await delay()
    }
    codes.forEach(code => { pending[code] = 1 })
    const result = await dictStore.getDicts(...codes)
    dicts.value = result
    codes.forEach(code => { pending[code] = 0 })
    return result
  }

  return {
    dict,
    getDict,
    dicts,
    getDicts
  }
}
