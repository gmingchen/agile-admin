<template>
  <el-pagination
    class="page flex_j_c-flex-end"
    background
    layout="total, sizes, prev, pager, next, jumper, ->"
    :current-page="page.current"
    :page-sizes="page.sizes"
    :page-size="page.size"
    :total="page.total"
    @current-change="currentChangeHandle"
    @size-change="sizeChangeHandle" />
    <!-- :hide-on-single-page="page.total <= page.size" -->
</template>

<script setup>
const emits = defineEmits(['change'])

const props = defineProps({
  page: {
    type: Object,
    required: true
  }
})

/**
 * @description: 当前页变化事件
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const currentChangeHandle = val => {
  emits('change', { current: val, size: props.page.size })
}

/**
 * @description: 当前页数变化事件
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const sizeChangeHandle = val => {
  emits('change', { current: props.page.current, size: val })
}
</script>

<style lang="scss" scoped>
</style>
