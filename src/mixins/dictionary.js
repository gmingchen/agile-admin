import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default function () {
  const store = useStore()

  const dictionary = reactive({
    dictionaryMap: {},
    dictionaryList: []
  })

  const getDictionary = async (code) => {
    const response = await store.dispatch('dictionary/getDictionary', code)
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
