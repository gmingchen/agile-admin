<script setup>
import useDict from '@/hooks/dict'

const props = defineProps({
  code: {
    type: [String],
    required: true
  },
  search: {
    type: Boolean,
    default: () => true
  }
})

const { dict, getDict } = useDict()

const refSelect = ref()

onBeforeMount(() => {
  getDict(props.code)
})
</script>

<template>
  <el-select ref="refSelect" v-bind="$attrs" clearable>
    <el-option value="" label="全部" v-if="search" />
    <el-option
      v-for="item in dict"
      :key="item.value"
      :value="item.value"
      :label="item.label" />
  </el-select>
</template>
