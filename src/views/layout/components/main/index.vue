<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-02 15:45:53
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-04 17:17:16
-->
<template>
  <div>
    <navbar />
    <tabs />
  </div>
</template>

<script>
import { Vue, Options } from 'vue-class-component'
import Navbar from '../navbar/index.vue'
import Tabs from '../tabs/index.vue'

@Options({
  components: { Navbar, Tabs }
})
export default class extends Vue {}
</script>

<style></style>
