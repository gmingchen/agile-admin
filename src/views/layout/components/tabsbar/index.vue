<template>
  <div class="tabsbar-container">tabsbar</div>
</template>

<script >
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.tabsbar-container {
  height: var(--gl-headbar-height);
  line-height: var(--gl-headbar-height);
  background-color: var(--gl-tabsbar-background-color);
}
</style>
