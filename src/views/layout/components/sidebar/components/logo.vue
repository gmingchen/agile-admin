<template>
  <div class="logo-container">logo</div>
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
.logo-container {
  height: var(--gl-headbar-height);
  line-height: var(--gl-headbar-height);
  background-color: var(--gl-sidebar-background-color);
}
</style>
