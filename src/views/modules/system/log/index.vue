<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-26 15:28:58
-->
<template>
  <div class="base-container">
    <el-form ref="formRef" :inline="true" :model="form" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.key" placeholder="用户名／用户操作" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
        <el-button v-if="isAuth('sys:log:truncate')" type="danger" @click="truncateHandle()">日志清理</el-button>
      </el-form-item>
    </el-form>
    <el-table class="base-table" :data="list" border v-loading="loading" element-loading-spinner="el-icon-loading">
      <el-table-column header-align="center" align="center" label="ID" prop="id" width="80" />
      <el-table-column header-align="center" align="center" label="用户名" prop="username" />
      <el-table-column header-align="center" align="center" label="用户操作" prop="operation" />
      <el-table-column header-align="center" align="center" label="请求方法" prop="method" width="150" :show-overflow-tooltip="true" />
      <el-table-column header-align="center" align="center" label="请求参数" prop="params" width="150" :show-overflow-tooltip="true" />
      <el-table-column header-align="center" align="center" label="执行时长(毫秒)" prop="time" />
      <el-table-column header-align="center" align="center" label="IP地址" prop="ip" width="150" />
      <el-table-column header-align="center" align="center" label="创建时间" prop="create_time" width="160" />
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
import { pageList, truncate } from '@API/system/log/index'

@Options({})
export default class extends Vue {
  protected form = {
    key: ''
  }
  protected page = {
    current: 1,
    size: 20,
    total: 0,
    sizes: [20, 50, 100, 200]
  }
  protected list: Array<IObject> = []
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
      key: this.form.key,
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
   * @description: 日志清理
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  truncateHandle(): void {
    this['$confirm'](`日志一旦清理将无法恢复，是否继续执行清理操作?`, '确认信息', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        truncate().then(r => {
          if (r && r.code === 0) {
            this.getList()
          }
        })
      })
      .catch(() => {
        // to do something on canceled
      })
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
