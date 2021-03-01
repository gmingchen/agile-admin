<!--
 * @Description: 版本控制
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-01 14:25:57
-->
<template>
  <div class="base-container">
    <el-form ref="formRef" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.beanName" placeholder="bean名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.type" placeholder="升级方式" clearable>
          <el-option label="不升级" :value="0"></el-option>
          <el-option label="升级" :value="1"></el-option>
          <el-option label="强制升级" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
        <el-button v-if="isAuth('sys:goodsmodel:save')" type="primary" @click="addOrEditHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table class="base-table" border :data="list" v-loading="loading" element-loading-spinner="el-icon-loading">
      <el-table-column header-align="center" align="center" label="ID" prop="id" width="80" />
      <el-table-column header-align="center" align="center" label="APPKey" prop="app" />
      <el-table-column header-align="center" align="center" label="版本号" prop="version" width="100" />
      <el-table-column header-align="center" align="center" label="APK-URL" prop="apk" :show-overflow-tooltip="true" />
      <el-table-column header-align="center" align="center" label="升级方式" prop="apk">
        <template v-slot="scope">
          <span v-if="scope.row.type === 0">不升级</span>
          <span v-if="scope.row.type === 1">升级</span>
          <span v-if="scope.row.type === 2">强制升级</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="升级提示" prop="upgrade_prompt" :show-overflow-tooltip="true" />
      <el-table-column header-align="center" align="center" label="更新内容" prop="content" :show-overflow-tooltip="true" />
      <el-table-column header-align="center" align="center" label="更新时间" prop="create_time" width="160" />
      <el-table-column header-align="center" align="center" label="操作" width="90" fixed="right">
        <template v-slot="scope">
          <el-button
            v-if="isAuth('sys:goodsmodel:update') && scope.row.deleted === 0"
            type="text"
            size="small"
            @click="addOrEditHandle(scope.row.id)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-or-edit ref="addOrEdit" v-if="visible" @refresh="getList" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { isAuth } from '@U/auth'
import { IObject } from '@/utils/index.type'
import { pageList } from '@API/system/version/index'
import AddOrEdit from './add-or-edit.vue'
import { $clearJson } from '@U/index'

@Options({
  components: { AddOrEdit }
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected form = {
    app: '',
    type: ''
  }
  protected page = {
    current: 1,
    size: 20,
    total: 0,
    sizes: [20, 50, 100, 200]
  }

  protected list: Array<IObject> = []

  protected loading: boolean = false

  protected visible: boolean = false

  activated() {
    this.getList()
  }

  isAuth = isAuth
  clearJson = $clearJson

  /**
   * @description: 获取列表
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  getList(): void {
    this.loading = true
    const params = {
      app: this.form.app,
      type: this.form.type,
      page: this.page.current,
      size: this.page.size
    }
    pageList(params).then(r => {
      if (r && r.code === 0) {
        this.list = r.data.list
        this.page.total = r.data.count
      } else {
        this.list = []
        this.page.total = 0
      }
      this.loading = false
    })
  }

  /**
   * @description: 新增/编辑弹窗
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  addOrEditHandle(id: number): void {
    this.visible = true
    this.$nextTick(() => {
      this.$refs.addOrEdit.init(id)
    })
  }
}
</script>

<style lang="scss" scoped></style>
