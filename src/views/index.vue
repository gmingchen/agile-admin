<template>
  <div class="home">
    <svg-icon name="home"></svg-icon>
    <button @click="test">click</button>
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
    return {
      store
    }
  },
  mounted () {
    console.log(222)
  },
  methods: {

    test () {
      this.$router.push('/test')
    }
  }
})
</script>
