<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-02 16:08:57
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-05 15:11:08
-->
<template>
  <el-breadcrumb :separator="separator" :separator-class="separatorClass">
    <el-breadcrumb-item v-for="item in crumbList" :key="item.id" :to="item.to" :replace="item.replace">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { ICrumbs } from '@/store/modules/crumbs/index.type'

const crumbsModule = namespace('crumbs')

@Options({})
export default class extends Vue {
  @crumbsModule.State('separator')
  separator!: string
  @crumbsModule.State('separatorClass')
  separatorClass!: string
  @crumbsModule.State('crumbList')
  crumbList!: ICrumbs
}
</script>

<style lang="scss" scoped></style>
