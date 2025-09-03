<template>
  <el-cascader
    :class="n.b()"
    ref="cascaderRef"
    v-model="value"
    :props="regionProps"
    :show-all-levels="false" />
</template>

<script setup>
import { regionSelectListApi } from '@/apis'
import { useNamespace, useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks'

const n = useNamespace('region')

const emits = defineEmits([UPDATE_MODEL_EVENT])

const props = defineProps({
  [MODEL_NAME]: {
    type: [String, Number, Array],
    default: () => []
  }
})

const cascaderRef = useTemplateRef('cascaderRef')

const value = useModel(props)

const regionProps = reactive({
  emitPath: false,
  checkStrictly: true,
  value: 'id',
  label: `name`,
  children: 'children',
  lazy: true,
  lazyLoad: (node, resolve) => {
    if (node.level === 0) {
      resolve([{ id: 0, name: '一级区域', level: 0, leaf: false, children: [] }])
    } else {
      regionSelectListApi({ parentId: node.value }).then(r => {
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

const getCheckedNodes = () => {
  return cascaderRef.value.getCheckedNodes()[0].data
}

defineExpose({
  getCheckedNodes
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: region#{$element-separator};
@include b(region) {}
</style>
