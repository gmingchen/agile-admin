<script setup>
import useDict from '@/hooks/dict'

const props = defineProps({
  code: {
    type: [String],
    required: true
  }
})

const { dict, getDict } = useDict()

const refRadio = ref()

onBeforeMount(() => {
  getDict(props.code)
})
</script>

<template>
  <el-radio-group ref="refRadio" v-bind="$attrs">
    <el-radio
      v-for="item in dict"
      :key="item.value"
      :label="item.value">
      {{item.label }}
    </el-radio>
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </el-radio-group>
</template>
