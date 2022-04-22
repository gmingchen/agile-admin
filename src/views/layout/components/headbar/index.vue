<template>
  <div class="headbar-container">header</div>
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
.headbar-container {
  height: var(--gl-headbar-height);
  line-height: var(--gl-headbar-height);
  background-color: var(--gl-headbar-background-color);
}
</style>
