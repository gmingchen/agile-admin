<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:56:55
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-29 17:36:51
-->
<template>
  <div></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'

const commonModule = namespace('common')

@Options({})
export default class extends Vue {
  resizeDocumentClientHeight(): void {
    // to do something
  }
}
</script>

<style></style>
