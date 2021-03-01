<!--
 * @Description: 定时任务
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-01 13:47:49
-->
<template>
  <div class="base-container">
    <el-form ref="formRef" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.beanName" placeholder="bean名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
        <el-button v-if="isAuth('sys:schedule:save')" type="primary" @click="addOrEditHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:schedule:delete')" type="danger" @click="delHandle()" :disabled="selection.length <= 0">批量删除</el-button>
        <el-button v-if="isAuth('sys:schedule:pause')" type="danger" @click="pauseHandle()" :disabled="selection.length <= 0">批量暂停</el-button>
        <el-button v-if="isAuth('sys:schedule:resume')" type="danger" @click="resumeHandle()" :disabled="selection.length <= 0">批量恢复</el-button>
        <el-button v-if="isAuth('sys:schedule:run')" type="danger" @click="runHandle()" :disabled="selection.length <= 0">批量立即执行</el-button>
        <el-button v-if="isAuth('sys:schedule:log')" type="success" @click="logHandle()">日志列表</el-button>
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
      <el-table-column header-align="center" align="center" label="ID" prop="jobId" width="80" />
      <el-table-column header-align="center" align="center" label="bean名称" prop="beanName" />
      <el-table-column header-align="center" align="center" label="参数" prop="params" />
      <el-table-column header-align="center" align="center" label="cron表达式" prop="cronExpression" />
      <el-table-column header-align="center" align="center" label="备注" prop="remark" />
      <el-table-column header-align="center" align="center" label="状态" prop="status">
        <template v-slot="scope">
          <el-tag v-if="scope.row.status === 0" size="small">正常</el-tag>
          <el-tag v-else size="small" type="danger">暂停</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作" width="150" fixed="right">
        <template v-slot="scope">
          <el-button v-if="isAuth('sys:schedule:update')" type="text" size="small" @click="addOrEditHandle(scope.row.jobId)">编辑</el-button>
          <el-button v-if="isAuth('sys:schedule:delete')" type="text" size="small" @click="delHandle(scope.row.jobId)">删除</el-button>
          <el-button v-if="isAuth('sys:schedule:pause')" type="text" size="small" @click="pauseHandle(scope.row.jobId)">暂停</el-button>
          <el-button v-if="isAuth('sys:schedule:resume')" type="text" size="small" @click="resumeHandle(scope.row.jobId)">恢复</el-button>
          <el-button v-if="isAuth('sys:schedule:run')" type="text" size="small" @click="runHandle(scope.row.jobId)">立即执行</el-button>
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
    <log ref="log" v-if="logVisible"></log>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { isAuth } from '@U/auth'
import { IObject } from '@/utils/index.type'
import { pageList, del, pause, resume, run } from '@API/system/job/index'
import AddOrEdit from './add-or-edit.vue'
import Log from './log.vue'
import { $clearJson } from '@U/index'

@Options({
  components: { AddOrEdit, Log }
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected form = {
    beanName: ''
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
  protected logVisible: boolean = false

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
      beanName: this.form.beanName,
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
   * @description: 批量暂停
   * @param {number} id
   * @return {*}
   * @author: gumingchen
   */
  pauseHandle(id: number): void {
    let ids: number[] = []
    if (id) {
      ids = [id]
    } else {
      ids = this.selection.map(item => {
        return item.id
      })
    }
    this['$confirm'](`确定对[id=${ids.join(',')}]进行[${id ? '暂停' : '批量暂停'}]操作?`, '确认信息', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        pause(ids).then(r => {
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
   * @description: 批量恢复
   * @param {number} id
   * @return {*}
   * @author: gumingchen
   */
  resumeHandle(id: number): void {
    let ids: number[] = []
    if (id) {
      ids = [id]
    } else {
      ids = this.selection.map(item => {
        return item.id
      })
    }
    this['$confirm'](`确定对[id=${ids.join(',')}]进行[${id ? '恢复' : '批量恢复'}]操作?`, '确认信息', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        resume(ids).then(r => {
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
   * @description: 批量立即执行
   * @param {number} id
   * @return {*}
   * @author: gumingchen
   */
  runHandle(id: number): void {
    let ids: number[] = []
    if (id) {
      ids = [id]
    } else {
      ids = this.selection.map(item => {
        return item.id
      })
    }
    this['$confirm'](`确定对[id=${ids.join(',')}]进行[${id ? '立即执行' : '批量立即执行'}]操作?`, '确认信息', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        run(ids).then(r => {
          if (r && r.code === 0) {
            this['$message']({
              message: '操作成功',
              type: 'success',
              duration: 1500
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

  /**
   * @description: 日志弹窗
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  logHandle(): void {
    this.logVisible = true
    this.$nextTick(() => {
      this.$refs.log.init()
    })
  }
}
</script>

<style lang="scss" scoped></style>
