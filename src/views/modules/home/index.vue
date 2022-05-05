<template>
  <div>
    <p v-for="item in 30" :key="item">{{item}}</p>
  </div>
</template>

<script >
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent({
  setup() {
    onBeforeMount(() => {
      console.log('reload')
    })
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
