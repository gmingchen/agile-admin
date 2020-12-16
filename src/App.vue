<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    console.log(store)
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
