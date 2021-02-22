<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-22 09:29:15
-->
<template>
  <div class="wrap">
    <el-form :inline="true" :model="form" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.name" placeholder="模型名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button v-if="$isAuth('sys:goodsmodel:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="$isAuth('sys:goodsmodel:delete')" type="danger" @click="deleteHandle()" :disabled="selection.length <= 0">
          批量删除
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class extends Vue {
  protected form = {
    name: ''
  }
  protected page = {
    current: 1,
    size: 20,
    total: 0,
    sizes: [20, 50, 100, 200]
  }

  getList(): void {
    // to do something
  }
}
</script>

<style lang="scss" scoped></style>
