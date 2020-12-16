<template>
  <div class="home">
    <svg-icon name="home"></svg-icon>
    <!-- <h1>{{exampleComputed}}</h1> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  data () {
    return {
      exampleData: '2020年12月15日 09:04:47'
    }
  },
  setup () {
    const store = useStore()
    console.log(store.state.common.name)
  }
})
</script>
