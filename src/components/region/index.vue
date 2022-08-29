<template>
  <el-cascader
    ref="refCascader"
    v-model="value"
    :props="regionProps"
    :show-all-levels="false" />
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue'

import useModel from '@/mixins/model'

import { selectListApi } from '@/api/region'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    required: true
  }
})

const value = useModel(props)

const refCascader = ref()
const regionProps = reactive({
  emitPath: false,
  checkStrictly: true,
  value: 'id',
  label: `name`,
  children: 'children',
  lazy: true,
  lazyLoad: (node, resolve) => {
    if (node.level === 0) {
      resolve([{
        id: 0,
        name: '一级区域',
        level: 0,
        leaf: false,
        children: []
      }])
    } else {
      selectListApi(node.value).then(r => {
        if (r) {
          resolve(r.data.map(item => {
            return {
              ...item,
              leaf: node.level === 2
            }
          }))
        }
      })
    }
  }
})

/**
 * 获取当前选中节点
 */
const getCheckedNodes = () => {
  return refCascader.value.getCheckedNodes()[0].data
}

</script>

<style lang="scss" scoped>

</style>
