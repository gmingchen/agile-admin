<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-15 21:56:49
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-07 22:19:37
-->
<template>
  <div>
    <el-switch
      :disabled="true"
      v-permission="'base:menu:display'"
      v-model="fa"
      active-color="#13ce66"
      inactive-color="#ff4949"
      :active-value="1"
      :inactive-value="0" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fa = ref(1)

    const test = () => {
      console.log('test')
    }
    return {
      fa,
      test
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
