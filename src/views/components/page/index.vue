<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-26 16:58:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 16:24:01
-->
<template>
  <el-pagination
    class="page"
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

<script lang="ts">
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
    const currentChangeHandle = (val: number): void => {
      emit('change', { current: val, size: props.page.size })
    }

    /**
     * @description: 当前页数变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const sizeChangeHandle = (val: number): void => {
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
.page {
  padding: 20px 0 0 0;
  text-align: center;
}
</style>
