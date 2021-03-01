<!--
 * @Description: 参数管理
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-01 14:45:25
-->
<template>
  <div class="base-container">
    <el-form ref="formRef" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.paramKey" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
        <el-button v-if="isAuth('sys:config:save')" type="primary" @click="addOrEditHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:config:delete')" type="danger" @click="delHandle()" :disabled="selection.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      class="base-table"
      border
      :data="list"
      @selection-change="selectionHandle"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column header-align="center" align="center" type="selection" width="50" />
      <el-table-column header-align="center" align="center" label="ID" prop="id" width="80" />
      <el-table-column header-align="center" align="center" label="参数名" prop="paramKey" />
      <el-table-column header-align="center" align="center" label="参数值" prop="paramValue" />
      <el-table-column header-align="center" align="center" label="备注" prop="remark" />
      <el-table-column header-align="center" align="center" label="操作" width="150" fixed="right">
        <template v-slot="scope">
          <el-button v-if="isAuth('sys:config:update')" type="text" size="small" @click="addOrEditHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('sys:config:delete')" type="text" size="small" @click="delHandle(scope.row.id)">删除</el-button>
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
    <add-or-edit ref="addOrEdit" v-if="visible" @refresh="getList" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { isAuth } from '@U/auth'
import { IObject } from '@/utils/index.type'
import { pageList, del } from '@API/system/config/index'
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
    paramKey: ''
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
      paramKey: this.form.paramKey,
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

  /**
   * @description: 批量删除
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  delHandle(id: number | null): void {
    let ids: number[] = []
    if (id) {
      ids = [id]
    } else {
      ids = this.selection.map(item => {
        return item.jobId
      })
    }
    this['$confirm'](`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '确认信息', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        del(ids).then(r => {
          if (r && r.code === 0) {
            this['$message']({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getList()
              }
            })
          }
        })
      })
      .catch(() => {
        // to do something on canceled
      })
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
