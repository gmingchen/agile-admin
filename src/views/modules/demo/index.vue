<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-01 16:37:45
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-07 14:27:35
-->
<template>
  <div class="demo">
    <svg-icon name="development" />
    <p v-for="item in 200" :key="item" @click="$router.push({ name: 'demo', query: { id: item } })">p-{{item}}</p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
export default class extends Vue {
  mounted(): void {
    console.log('mounted')
    // to do something
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/_mixin.scss';
.demo {
  width: 100%;
}
</style>
