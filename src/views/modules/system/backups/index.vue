<!--
 * @Description: 备份
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-26 16:26:40
-->
<template>
  <div class="base-container">
    <el-form ref="formRef" :inline="true" :model="form" @keyup.enter="getList()">
      <el-form-item>
        <el-select v-model="form.type" placeholder="备份方式" clearable>
          <el-option label="手动" :value="1"></el-option>
          <el-option label="自动" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="form.date" type="daterange" range-separator="-" start-placeholder="开始备份日期" end-placeholder="结束备份日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
        <el-button v-if="isAuth('sys:backups:save')" type="danger" @click="addHandle()">备份</el-button>
        <el-button v-if="isAuth('sys:backups:truncate')" type="danger" @click="truncateHandle()">清库</el-button>
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
      <el-table-column header-align="center" align="center" label="ID" prop="id" width="80" />
      <el-table-column header-align="center" align="center" label="名称" prop="name" />
      <el-table-column header-align="center" align="center" label="备份方式" prop="type">
        <template v-slot="scope">
          <el-tag v-if="scope.row.type === 1" size="small" type="danger">手动</el-tag>
          <el-tag v-else size="small">自动</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="备份时间" prop="create_time" width="160" />
      <el-table-column header-align="center" align="center" label="操作" prop="create_time" width="140" fixed="right">
        <template v-slot="scope">
          <el-button v-if="isAuth('sys:backups:download')" type="text" @click="downloadHandle(scope.row.id)">下载</el-button>
          <el-button v-if="isAuth('sys:backups:recovery')" type="text" @click="recoveryHandle(scope.row.id)">恢复</el-button>
          <el-button v-if="isAuth('sys:backups:delete')" type="text" @click="delHandle(scope.row.id)">删除</el-button>
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
import { $clearJson, $parseDate2Str } from '@U/index'
import { IObject } from '@/utils/index.type'
import { pageList, save, recovery, download, del, truncate } from '@API/system/backups/index'

@Options({})
export default class extends Vue {
  protected form = {
    type: '',
    date: []
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
      type: this.form.type,
      start: this.form.date.length ? $parseDate2Str(this.form.date[0]) : '',
      end: this.form.date.length ? $parseDate2Str(this.form.date[1]) : '',
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
   * @description: 新增备份
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  addHandle(): void {
    save().then(r => {
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
  }

  /**
   * @description: 数据恢复
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  recoveryHandle(id: number): void {
    this['$confirm'](`一旦恢复数据将无法还原，确定对[id=${id}]进行[恢复]操作?`, '确认信息', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        recovery(id).then(r => {
          if (r && r.code === 0) {
            this['$message']({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$router.push({ name: 'login' })
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
   * @description: 下载备份文件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  downloadHandle(id: number): void {
    const url = download(id)
    window.open(url)
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
        return item.id
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
   * @description: 清库
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  truncateHandle(): void {
    this['$confirm'](`一旦执行清库操作数据将不可恢复，是否还继续执行清库操作?`, '确认信息', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        truncate().then(r => {
          if (r && r.code === 0) {
            this['$message']({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$router.push({ name: 'login' })
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
