import { reactive, toRefs } from 'vue'
import { useDictionaryStore } from '@stores/dictionary'

export default function () {
  const dictionaryStore = useDictionaryStore()

  const dictionary = reactive({
    dictionaryMap: {},
    dictionaryList: []
  })

  const getDictionary = async (code) => {
    const response = await dictionaryStore.getDictionary(code)
    dictionary.dictionaryList = response

    const result = {}
    response.forEach(item => {
      result[item.value] = item.label
    })
    dictionary.dictionaryMap = result
    return { list: response, map: result }
  }

  return {
    ...toRefs(dictionary),
    getDictionary
  }
}
