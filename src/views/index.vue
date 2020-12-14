<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{exampleData}}</h1>
    <h1>{{exampleComputed}}</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Index extends Vue {
  // data
  exampleData = 'example';
  // Computed
  get exampleComputed () {
    return 1
  };
  mounted () {
    this.exampleMethod()
  };
  // method
  exampleMethod () {
    console.log('方法')
  };
}
</script>
