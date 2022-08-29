import { computed, getCurrentInstance } from 'vue'

import { MODEL_NAME, UPDATE_MODEL_EVENT } from '@/utils/constant'

export default function (props, key) {
  const vm = getCurrentInstance().proxy
  return computed({
    get() {
      return props[key || MODEL_NAME]
    },
    set(value) {
      const event = key ? `update:${ key }` : UPDATE_MODEL_EVENT
      vm.$emit(event, value)
    }
  })
}
