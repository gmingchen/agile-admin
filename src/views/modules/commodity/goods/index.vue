<!--
 * @Description: 商品
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-03 15:48:15
-->
<template>
  <div class="base-container">
    <el-form ref="formRef" :inline="true" :model="form" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.name" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-cascader v-model="form.type" :props="props" placeholder="商品分类" clearable></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.status" placeholder="商品状态" clearable>
          <el-option label="上架" :value="1"></el-option>
          <el-option label="下架" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
        <el-button v-if="isAuth('sys:goods:save')" type="primary" @click="addOrEditHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:goods:delete')" type="danger" @click="delHandle()" :disabled="selection.length <= 0"> 批量删除 </el-button>
      </el-form-item>
    </el-form>
    <el-table class="base-table" :data="list" border @selection-change="selectionHandle">
      <el-table-column header-align="center" align="center" width="50" type="selection" />
      <el-table-column header-align="center" align="center" label="ID" prop="id" width="80" />
      <el-table-column header-align="center" align="center" label="模型名称" prop="name" />
      <el-table-column header-align="center" align="center" label="规格数量" prop="spec_count" width="180" />
      <el-table-column header-align="center" align="center" label="参数数量" prop="attr_count" width="180" />
      <el-table-column header-align="center" align="center" label="创建时间" prop="create_time" width="160" />
      <el-table-column header-align="center" align="center" label="操作" width="210" fixed="right">
        <template v-slot="scope">
          <el-button v-if="isAuth('sys:goodsspec:page')" type="text" size="small" @click="specHandle(scope.row.id)">查看规格</el-button>
          <el-button v-if="isAuth('sys:goodsmodelattr:page')" type="text" size="small" @click="attrHandle(scope.row.id)">查看参数</el-button>
          <el-button v-if="isAuth('sys:goodsmodel:update')" type="text" size="small" @click="addOrEditHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('sys:goodsmodel:delete')" type="text" size="small" @click="delHandle(scope.row.id)">删除</el-button>
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
import { pageList, del } from '@API/commodity/goods/index'
import { select } from '@API/commodity/type/index'

@Options({
  // components: { AddOrEdit, Attr, Spec }
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected isAuth = isAuth
  protected clearJson = $clearJson

  protected props = {
    lazy: true,
    lazyLoad: async (node, resolve) => {
      const { level, value } = node
      let id = 0
      if (level !== 0) {
        id = value
      }
      const list = await this.getTypes(id)
      const nodes = list.map(item => ({
        value: item.id,
        label: item.name,
        leaf: item.model_count <= 0
      }))
      resolve(nodes)
    }
  }

  protected form = {
    name: '',
    type: [],
    status: ''
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

  /**
   * @description: 获取列表
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  getList(): void {
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
    })
  }

  /**
   * @description: 获取分类
   * @param {*} id
   * @return {*}
   * @author: gumingchen
   */
  async getTypes(id: number | null) {
    let result: Array<IObject> = []
    const r = await select({ parent_id: id })
    if (r.code === 0) {
      result = r.data
    }
    return result
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
}
</script>

<style lang="scss" scoped></style>
