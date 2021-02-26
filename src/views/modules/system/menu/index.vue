<!--
 * @Description: 备份
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 09:08:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-26 15:26:25
-->
<template>
  <div class="base-container">
    <el-form ref="formRef" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-button v-if="isAuth('sys:menu:save')" type="primary" @click="addOrEditHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table class="base-table" border :data="list" row-key="id" v-loading="loading" element-loading-spinner="el-icon-loading">
      <el-table-column prop="name" header-align="center" min-width="150" label="名称" />
      <el-table-column prop="parentName" header-align="center" align="center" width="120" label="上级菜单" />
      <el-table-column header-align="center" align="center" label="图标">
        <template v-slot="scope">
          <svg-icon :name="scope.row.icon || ''"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column prop="type" header-align="center" align="center" label="类型">
        <template v-slot="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
          <el-tag v-else-if="scope.row.type === 3" size="small" type="warning">子页面</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" header-align="center" align="center" label="排序号" />
      <el-table-column prop="url" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="菜单URL" />
      <el-table-column prop="perms" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="授权标识" />
      <el-table-column prop="display" header-align="center" align="center" label="是否显示">
        <template v-slot="scope">
          <el-switch
            :disabled="!isAuth('sys:menu:display')"
            @change="displayHandle(scope.row)"
            v-model="scope.row.display"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="tab" header-align="center" align="center" label="是否在tab显示">
        <template v-slot="scope">
          <el-switch
            v-if="scope.row.type !== 0 && scope.row.url"
            :disabled="!scope.row.display || !isAuth('sys:menu:tab')"
            @change="tabHandle(scope.row)"
            v-model="scope.row.tab"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template v-slot="scope">
          <el-button v-if="isAuth('sys:menu:update')" type="text" size="small" @click="addOrEditHandle(scope.row.id)">编辑</el-button>
          <el-button v-if="isAuth('sys:menu:delete')" type="text" size="small" @click="delHandle(scope.row.id)">删除</el-button>
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
import { $parseData2Tree } from '@U/index'
import { list, del, display, tab } from '@API/system/menu/index'
import AddOrEdit from './add-or-edit.vue'

@Options({
  components: { AddOrEdit }
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected list: Array<IObject> = []

  protected loading: boolean = false

  protected visible: boolean = false

  activated() {
    this.getList()
  }

  isAuth = isAuth

  /**
   * @description: 获取列表
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  getList(): void {
    this.loading = true
    list().then(r => {
      if (r && r.code === 0) {
        this.list = $parseData2Tree(r.data)
      } else {
        this.list = []
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
   * @description: 是否显示
   * @param {IObject} data
   * @return {*}
   * @author: gumingchen
   */
  displayHandle(data: IObject): void {
    const params = {
      id: data.id,
      display: data.display
    }
    display(params).then(r => {
      if (r && r.code === 0) {
        this['$message']({
          message: '操作成功',
          type: 'success',
          duration: 1500
        })
      } else {
        this.getList()
      }
    })
  }

  /**
   * @description: 标签页是否显示
   * @param {IObject} data
   * @return {*}
   * @author: gumingchen
   */
  tabHandle(data: IObject): void {
    const params = {
      id: data.id,
      tab: data.display
    }
    tab(params).then(r => {
      if (r && r.code === 0) {
        this['$message']({
          message: '操作成功',
          type: 'success',
          duration: 1500
        })
      } else {
        this.getList()
      }
    })
  }

  /**
   * @description: 删除
   * @param {number} id
   * @return {*}
   * @author: gumingchen
   */
  delHandle(id: number): void {
    this['$confirm'](`确定对[id=${id}]进行[删除]操作?`, '确认信息', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        del(id).then(r => {
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
}
</script>

<style lang="scss" scoped></style>
