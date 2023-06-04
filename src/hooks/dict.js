export default function () {
  const dictStore = useDictStore()

  const dict = ref([])
  const dicts = ref({})

  const getDict = async (code) => {
    const result = await dictStore.getDict(code)
    dict.value = result
    return result
  }

  const getDicts = async (...codes) => {
    const result = await dictStore.getDicts(...codes)
    dicts.value = result
    return result
  }

  return {
    dict,
    getDict,
    dicts,
    getDicts
  }
}
