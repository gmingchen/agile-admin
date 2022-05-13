<template>
  <el-scrollbar
    class="flex-item_f-1 "
    :view-class="`flex-box flex_d-column`">
    <slot name="headbar" />
    <slot name="tabsbar" />
    <slot />
  </el-scrollbar>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
