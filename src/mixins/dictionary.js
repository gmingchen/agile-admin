import { reactive, toRefs } from 'vue'
import { getDictionaryMap as dictionaryMap, getDictionaryList as dictionaryList } from '@/utils'

export default function () {
  const dictionary = reactive({
    dictionaryMap: {},
    dictionaryList: []
  })

  const getDictionaryMap = (code) => {
    dictionaryMap(code).then(r => {
      dictionary.dictionaryMap = r
    })
  }

  const getDictionaryList = (code) => {
    dictionaryList(code).then(r => {
      dictionary.dictionaryList = r
    })
  }

  return {
    ...toRefs(dictionary),
    getDictionaryMap,
    getDictionaryList
  }
}
