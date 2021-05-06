<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-01 16:37:45
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 16:50:17
-->
<template>
  <div class="demo">
    <svg-icon name="development" />
    <p v-for="item in 200" :key="item" @click="router.push({ name: 'demo', query: { id: item } })">p-{{item}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    return {
      router
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'Sass/_mixin.scss';
.demo {
  width: 100%;
}
</style>
