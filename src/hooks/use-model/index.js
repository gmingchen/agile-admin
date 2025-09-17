export const MODEL_NAME = 'modelValue'
export const UPDATE_MODEL_EVENT = 'update:modelValue'

export const useModel = (props, key) => {
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
