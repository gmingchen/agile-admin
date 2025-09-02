<template>
  <component :class="n.b()" :is="component" v-model="value" v-bind="$attrs" :list="list" />
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { Radio, Select } from './components'
import { DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { useDictStore } from '@/stores'
import { useNamespace, useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks'
const n = useNamespace('dict')

const emits = defineEmits([UPDATE_MODEL_EVENT])

const props = defineProps({
  [MODEL_NAME]: {
    type: [String, Number, Boolean, Array],
    default: () => ''
  },
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: () => DICT_COMPONENT_TYPE_ENUM.RADIO,
    validator: (val) => {
      return [DICT_COMPONENT_TYPE_ENUM.RADIO, DICT_COMPONENT_TYPE_ENUM.SELECT].includes(val)
    }
  },
  defaultValue: {
    type: Boolean,
    default: () => false
  }
})

const value = useModel(props)

const dictStore = useDictStore()

const component = computed(() => {
  if (props.type === DICT_COMPONENT_TYPE_ENUM.RADIO) {
    return Radio
  }
  if (props.type === DICT_COMPONENT_TYPE_ENUM.SELECT) {
    return Select
  }
})

const list = ref([])

watch(() => list.value, () => {

}, { once: true })

const init = () => {
  const { code, defaultValue } = props
  list.value = dictStore.dicts[code]
  if (defaultValue && list.value.length) {
    value.value = list.value[0].code
  }
}

onBeforeMount(() => {
  init()
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(dict) {}
</style>
