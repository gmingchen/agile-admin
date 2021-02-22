<!--
 * @Description: 商品模型
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-22 14:23:18
-->
<template>
  <div class="base-container">
    <el-form ref="formRef" :inline="true" :model="form" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.name" placeholder="模型名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button @click="clearJson(form), getList()">重置</el-button>
        <el-button v-if="isAuth('sys:goodsmodel:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:goodsmodel:delete')" type="danger" @click="deleteHandle()" :disabled="selection.length <= 0">
          批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table class="base-table" :data="list" border @selection-change="selectionHandle">
      <el-table-column align="center" header-align="center" width="50" type="selection" />
      <el-table-column align="center" header-align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" header-align="center" label="模型名称" prop="name" />
      <el-table-column align="center" header-align="center" label="规格数量" prop="spec_count" width="180" />
      <el-table-column align="center" header-align="center" label="参数数量" prop="attr_count" width="180" />
      <el-table-column align="center" header-align="center" label="创建时间" prop="create_time" width="160" />
      <el-table-column align="center" header-align="center" label="操作" width="210" fixed="right">
        <template v-slot="scope">
          <!-- <el-button v-if="isAuth('sys:goodsspec:page')" type="text" size="small" @click="specHandle(scope.row.id)">查看规格</el-button>
          <el-button v-if="isAuth('sys:goodsmodelattr:page')" type="text" size="small" @click="attrHandle(scope.row.id)">查看参数</el-button>
          <el-button v-if="isAuth('sys:goodsmodel:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button> -->
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
import { pageList, del } from '@API/commodity/model/index'

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
