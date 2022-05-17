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

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    /**
     * @description: 当前页变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const currentChangeHandle = val => {
      emit('change', { current: val, size: props.page.size })
    }

    /**
     * @description: 当前页数变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const sizeChangeHandle = val => {
      emit('change', { current: props.page.current, size: val })
    }

    return {
      currentChangeHandle,
      sizeChangeHandle
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
