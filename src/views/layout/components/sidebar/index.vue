<template>
  <div class="sidebar-container">
    <Logo />
  </div>
</template>

<script >
import { defineComponent } from 'vue'

import Logo from './components/logo.vue'

export default defineComponent({
  components: { Logo },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.sidebar-container {}
</style>
