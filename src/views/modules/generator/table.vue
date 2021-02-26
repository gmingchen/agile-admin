<!--
 * @Description: 备份
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-26 15:28:36
-->
<template>
  <div class="base-container">
    <el-form ref="formRef" :inline="true" :model="form" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.name" placeholder="表名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
        <el-button v-if="isAuth('generator:table:create')" type="primary" @click="createHandle()" :disabled="selection.length <= 0">
          批量代码生成
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      class="base-table"
      :data="list"
      border
      @selection-change="selectionHandle"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column header-align="center" align="center" width="50" type="selection" />
      <el-table-column header-align="center" align="center" type="index" label="#" width="80" />
      <el-table-column header-align="center" align="center" label="名称" prop="name" />
      <el-table-column header-align="center" align="center" label="Engine" prop="engine" />
      <el-table-column header-align="center" align="center" label="Rows" prop="row" width="100" />
      <el-table-column header-align="center" align="center" label="编码集" prop="collation" width="120" :show-overflow-tooltip="true" />
      <el-table-column header-align="center" align="center" label="备注" prop="comment" />
      <el-table-column header-align="center" align="center" label="更新时间" prop="update_time" width="160" />
      <el-table-column header-align="center" align="center" label="创建时间" prop="create_time" width="160" />
      <el-table-column header-align="center" align="center" label="操作" prop="create_time" width="90" fixed="right">
        <template v-slot="scope">
          <el-button v-if="isAuth('generator:table:create')" type="text" @click="createHandle(scope.row.name)">代码生成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="base-pagination"
      background
      @current-change="pageCurrentHandle"
      @size-change="pageSizeHandle"
      :current-page="page.current"
      :page-sizes="page.sizes"
      :page-size="page.size"
      :total="page.total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { isAuth } from '@U/auth'
import { $clearJson } from '@U/index'
import { IObject } from '@/utils/index.type'
import { pageList, create } from '@API/generator/index'

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
  protected list: Array<IObject> = []
  protected selection: Array<IObject> = []

  protected loading: boolean = false

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
      name: this.form.name,
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
   * @description: 代码生成
   * @param {string} name
   * @return {*}
   * @author: gumingchen
   */
  createHandle(name: string): void {
    let names: string[] = []
    if (name) {
      names = [name]
    } else {
      names = this.selection.map(item => {
        return item.name
      })
    }
    create(names).then(r => {
      if (r) {
        const blob = new Blob([r])
        const href = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = href
        a.download = 'code.zip'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(href)
      }
    })
    // todo something
  }

  /**
   * @description: table多选事件
   * @param {*} val
   * @return {*}
   * @author: gumingchen
   */
  selectionHandle(val: Array<IObject>): void {
    this.selection = val
  }

  /**
   * @description: 当前页变化事件
   * @param {*} val
   * @return {*}
   * @author: gumingchen
   */
  pageCurrentHandle(val: number): void {
    this.page.current = val
    this.getList()
  }

  /**
   * @description: 分页大小变化事件
   * @param {*} val
   * @return {*}
   * @author: gumingchen
   */
  pageSizeHandle(val: number): void {
    this.page.size = val
    this.getList()
  }
}
</script>

<style lang="scss" scoped></style>
