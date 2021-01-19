<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-01-19 08:59:25
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-19 09:03:11
-->
<template>
  <div>tishi</div>
</template>

<script lang="ts">
import { Message, Alert, Confirm, Prompt, Notify } from '@/mixins/element/index'
import { Options } from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import { promptComponent, promptMessage, promptDuration } from '@C/index'

@Options({})
export default class Index extends Mixins(Loading, Message, Alert, Confirm, Prompt, Notify) {}
</script>
