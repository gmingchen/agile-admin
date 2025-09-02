<template>
  <el-pagination
    :class="n.b()"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="sizes"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper, ->"
    background
    @current-change="handleChange"
    @size-change="handleChange"
    v-bind="$attrs">
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </el-pagination>
</template>

<script setup>
import { useModel } from '@/hooks'
import { useNamespace } from '@/hooks';

const n = useNamespace('pagination')

const emits = defineEmits(['update:current', 'update:size', 'change'])

const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  sizes: {
    type: Array,
    default: () => [10, 20, 30, 40, 50, 100, 200]
  }
})

const currentPage = useModel(props, 'current')
const pageSize = useModel(props, 'size')

const handleChange = () => {
  emits('change', currentPage.value, pageSize.value)
}

// const repeat = ref(false)

// watch(() => currentPage.value, () => {
//   if (repeat.value) {
//     repeat.value = false
//   } else {
//     handleChange()
//   }
// })
// watch(() => pageSize.value, value => {
//   const max = Math.ceil(props.total / value)
//   if (currentPage.value > max) {
//     repeat.value = true
//   }
//   handleChange()
// })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(pagination) {
  display: flex;
  justify-content: flex-end;
}
</style>
