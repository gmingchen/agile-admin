<template>
  <div>
    <p v-for="item in 30" :key="item">{{item}}</p>
  </div>
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

</style>
