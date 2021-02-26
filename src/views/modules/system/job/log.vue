<!--
 * @Description: 日志弹出
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-26 17:35:16
-->
<template>
  <el-dialog width="60%" v-model="visible" title="日志列表" :close-on-click-modal="false" :destroy-on-close="true" @closed="dialogClosedHandle">
    <el-form ref="formRef" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.id" placeholder="任务ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table class="base-table" border :data="list" v-loading="loading" element-loading-spinner="el-icon-loading">
      <el-table-column header-align="center" align="center" label="日志ID" prop="logId" width="80"> </el-table-column>
      <el-table-column header-align="center" align="center" label="任务ID" prop="jobId" width="80"> </el-table-column>
      <el-table-column header-align="center" align="center" label="bean名称" prop="beanName"> </el-table-column>
      <el-table-column header-align="center" align="center" label="参数" prop="params"> </el-table-column>
      <el-table-column header-align="center" align="center" label="状态" prop="status">
        <template v-slot="scope">
          <el-tag v-if="scope.row.status === 0" size="small">成功</el-tag>
          <el-tag v-else @click="showErrorInfo(scope.row.logId)" size="small" type="danger" style="cursor: pointer">失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="耗时(单位: 毫秒)" prop="times"> </el-table-column>
      <el-table-column header-align="center" align="center" label="执行时间" prop="create_time" width="180"> </el-table-column>
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
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { logPageList } from '@API/system/job/index'
import { IObject } from '@/utils/index.type'
import { $clearJson } from '@/utils'

@Options({
  emits: ['refresh']
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected form = {
    id: null
  }
  protected page = {
    current: 1,
    size: 20,
    total: 0,
    sizes: [20, 50, 100, 200]
  }
  protected list: Array<IObject> = []
  protected visible: boolean = false
  protected loading: boolean = false

  clearJson = $clearJson

  /**
   * @description: 初始化事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  init(): void {
    this.visible = true
    this.getList()
  }

  /**
   * @description: 获取列表
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  getList(): void {
    this.loading = true
    const params = {
      jobId: this.form.id,
      page: this.page.current,
      size: this.page.size
    }
    logPageList(params).then(r => {
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

  /**
   * @description: 弹窗关闭动画结束时的回调
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  dialogClosedHandle(): void {
    this.form.id = null
  }
}
</script>

<style lang="scss" scoped></style>
