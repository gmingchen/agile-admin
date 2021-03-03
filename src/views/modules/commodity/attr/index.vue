<!--
 * @Description: 模型参数
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-03 11:12:57
-->
<template>
  <el-dialog width="50%" v-model="visible" :title="`参数列表`" :close-on-click-modal="false" :destroy-on-close="true" @closed="dialogClosedHandle">
    <el-form ref="formRef" :inline="true" :model="form" @keyup.enter="getList()">
      <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="参数名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
        <el-button v-if="isAuth('sys:goodsmodelattr:save')" type="primary" @click="addOrEditHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:goodsmodelattr:delete')" type="danger" @click="delHandle()" :disabled="selection.length <= 0">
          批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table class="base-table" :data="list" border @selection-change="selectionHandle">
      <el-table-column header-align="center" align="center" width="50" type="selection" />
      <el-table-column header-align="center" align="center" label="ID" prop="id" width="80" />
      <el-table-column header-align="center" align="center" label="参数名称" prop="name" />
      <el-table-column header-align="center" align="center" label="可选参数列表" prop="vals" width="180" :show-overflow-tooltip="true" />
      <el-table-column header-align="center" align="center" label="排序" prop="sort" width="80"></el-table-column>
      <el-table-column header-align="center" align="center" label="创建时间" prop="create_time" width="160"></el-table-column>
      <el-table-column header-align="center" align="center" label="操作" width="90" fixed="right">
        <template v-slot="scope">
          <el-button v-if="isAuth('sys:goodsmodelattr:update')" type="text" size="small" @click="addOrEditHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('sys:goodsmodelattr:delete')" type="text" size="small" @click="delHandle(scope.row.id)">删除</el-button>
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
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { isAuth } from '@U/auth'
import { $clearJson } from '@U/index'
import { pageList, del } from '@API/commodity/attr/index'
import { IObject } from '@/utils/index.type'
import AddOrEdit from './add-or-edit.vue'

@Options({
  emits: ['refresh'],
  components: { AddOrEdit }
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected isAuth = isAuth
  protected clearJson = $clearJson

  protected key: number = 0
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
  protected visible: boolean = false
  protected loading: boolean = false

  /**
   * @description: 初始化事件
   * @param {number} key
   * @return {*}
   * @author: gumingchen
   */
  init(key: number = 0) {
    this.key = key
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
    const params = {
      model_id: this.key,
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
      this.$refs.addOrEdit.init(this.key, id)
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
   * @description: 弹窗关闭动画结束时的回调
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  dialogClosedHandle(): void {
    this.$refs['formRef'].resetFields()
    this.$emit('refresh')
  }
}
</script>

<style lang="scss" scoped></style>
