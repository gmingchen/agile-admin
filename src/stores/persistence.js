import { STORAGE_TYPE_ENUM } from '@/common/enums';
import { get, set, print, printError } from '@/common/utils'

const STORE_PININ_KEY = 'PINIA_STORE_'

/**
 * 存储数据
 * @param {*} id
 * @param {*} key
 * @param {*} state
 */
const handleSet = (id, key, state) => {
  window.addEventListener('beforeunload', () => {
    const data = JSON.stringify(state || {})
    set(key, data, STORAGE_TYPE_ENUM.LOCAL)
    print(`Pinia persistent ${ id } success`)
  });
}

/**
 * 获取数据
 * @param {*} id
 * @param {*} key
 * @param {*} patch
 */
const handleGet = (id, key, patch) => {
  const data = get(key, STORAGE_TYPE_ENUM.LOCAL)
  if (data) {
    try {
      const parsedData = JSON.parse(data)
      patch(parsedData)
      print(`Pinia patch ${ id } success`, parsedData)
    } catch (error) {
      printError(`Pinia patch ${ id } error`, parsedData)
    }
  }
}

export default context => {
  const { $id, $state, $patch } = context.store
  const key = STORE_PININ_KEY + $id

  handleSet($id, key, $state)
  handleGet($id, key, $patch)
}
