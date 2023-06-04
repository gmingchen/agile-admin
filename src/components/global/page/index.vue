<script setup>
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

const currentPage = computed({
  get: () => props.current,
  set: val => {
    emits('update:current', val)
  }
})

const pageSize = computed({
  get: () => props.size,
  set: val => {
    emits('update:size', val)
  }
})

/**
 * @description: 当前页变化事件
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const changeHandle = () => {
  emits('change', { current: currentPage.value, size: pageSize.value })
}
</script>

<template>
  <el-pagination
    v-bind="$attrs"
    class="page flex_j_c-flex-end"
    layout="total, sizes, prev, pager, next, jumper, ->"
    background
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :page-sizes="sizes"
    @current-change="changeHandle"
    @size-change="changeHandle">
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </el-pagination>
  <!-- :hide-on-single-page="page.total <= page.size" -->
</template>
