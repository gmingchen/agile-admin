import { reactive, toRefs } from 'vue'
import { getDictionaryMap as dictionaryMap, getDictionaryList as dictionaryList } from '@/utils'

export default function () {
  const dictionary = reactive({
    dictionaryMap: {},
    dictionaryList: []
  })

  const getDictionaryMap = async (code) => {
    const r = await dictionaryMap(code)
    dictionary.dictionaryMap = r
    return r
  }

  const getDictionaryList = async (code) => {
    const r = await dictionaryList(code)
    dictionary.dictionaryList = r
    return r
  }

  const getDictionaryLabel = async (code, value) => {
    const r = await dictionaryMap(code)
    return r[value]
  }

  return {
    ...toRefs(dictionary),
    getDictionaryMap,
    getDictionaryList,
    getDictionaryLabel
  }
}
