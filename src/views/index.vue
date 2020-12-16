<template>
  <div class="home">
    <svg-icon name="home"></svg-icon>
    <!-- <h1>{{exampleComputed}}</h1> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    return {
      exampleData: '2020年12月15日 09:04:47'
    }
  }
})
</script>
