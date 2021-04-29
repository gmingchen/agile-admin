<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-21 22:52:19
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-29 11:41:32
-->
<template>
  <div class="g-container">
    <el-form ref="formR" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.username" :placeholder="$t('field.account')" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.nickname" :placeholder="$t('field.nickname')" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">{{ $t('button.query') }}</el-button>
        <el-button @click="clearJson(form), getList()">{{ $t('button.reset') }}</el-button>
        <el-button v-if="isAuth('base:user:create')" type="primary" @click="addEditHandle()">{{ $t('button.add') }}</el-button>
        <el-button
          v-if="isAuth('base:user:delete')"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0">{{ $t('button.batchDelete') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      class="g-table"
      element-loading-spinner="el-icon-loading"
      v-loading="loading"
      :data="list"
      @selection-change="selectionHandle">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column
        align="center"
        label="ID"
        prop="id"
        width="80" />
      <el-table-column
        align="center"
        :label="$t('field.account')"
        prop="username" />
      <el-table-column
        align="center"
        :label="$t('field.nickname')"
        prop="nickname" />
      <el-table-column
        align="center"
        :label="$t('field.mobile')"
        prop="mobile"
        width="120" />
      <el-table-column
        align="center"
        :label="$t('field.email')"
        prop="email" />
      <el-table-column
        align="center"
        :label="$t('base.role.roleName')"
        prop="roles">
        <template v-slot="{ row }">
          <span class="role-name-span" v-for="item in row.roles" :key="item.id">{{ item.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('field.time', [$t('field.create')])"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        :label="$t('field.operation')"
        width="150"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-if="isAuth('base:user:status')"
            type="text"
            size="small"
            @click="statusHandle(row)">{{ $t( row.status === 1 ? 'button.disable' : 'button.enable') }}</el-button>
          <el-button
            v-if="isAuth('base:user:update')"
            type="text"
            size="small"
            @click="addEditHandle(row.id)">{{ $t('button.edit') }}</el-button>
          <el-button
            v-if="isAuth('base:user:delete')"
            type="text"
            size="small"
            @click="delHandle(row.id)">{{ $t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :page="page" @change="pageChangeHandle" />
    <add-edit ref="addEdit" v-if="visible" @refresh="getList" />
  </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component'
import { Inject } from 'vue-property-decorator'
import page, { IPage } from '@/mixins/page'
import Page from '@V/components/page/index.vue'
import AddEdit from './components/add-edit.vue'
import { del, getPage, setStatus } from '@/api/base/user'
import { IObject } from '@/types'
import { User } from '@/types/user'

@Options({
  components: { Page, AddEdit }
})
export default class extends mixins(page) {
  @Inject('isAuth') isAuth!: (arg: string) => boolean
  @Inject('clearJson') clearJson!: (arg: IObject) => void

  protected loading: boolean = false
  protected visible: boolean = false

  protected form = {
    username: '',
    nickname: ''
  }
  protected list: User.Vo[] = []
  protected selection: User.Vo[] = []

  created(): void {
    this.getList()
  }

  /**
   * @description: 获取分页列表
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  getList(): void {
    const params = {
      ...this.form,
      current: this.page.current,
      size: this.page.size
    }
    this.loading = true
    getPage(params).then(r => {
      if (r) {
        this.list = r.data.list
        this.page.total = r.data.total
      }
      this.$nextTick(() => {
        this.loading = false
      })
    })
  }

  /**
   * @description: 新增/编辑弹窗
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  addEditHandle(id?: number): void {
    this.visible = true
    this.$nextTick(() => {
      this.$refs.addEdit.init(id)
    })
  }

  /**
   * @description: 删除
   * @param {number} id
   * @return {*}
   * @author: gumingchen
   */
  delHandle(id: number): void {
    let params: number[]
    if (id) {
      params = [id]
    } else {
      params = this.selection.map(item => item.id!)
    }
    this.$confirm(this.$t('tip.confirmTips', [params.join(','), this.$t(id ? 'button.delete' : 'button.batchDelete')]), this.$t('tip.tips'), {
      confirmButtonText: this.$t('button.confirm'),
      cancelButtonText: this.$t('button.cancel'),
      type: 'warning'
    })
      .then(() => {
        del(params).then(r => {
          if (r) {
            this.$message({
              message: this.$t('tip.success'),
              type: 'success'
            })
            this.getList()
          }
        })
      })
      .catch(() => {
        // to do something on canceled
      })
  }

  /**
   * @description: 状态
   * @param {number} id
   * @return {*}
   * @author: gumingchen
   */
  statusHandle(row: User.Vo): void {
    this.$confirm(this.$t('tip.confirmTips', [row.id, this.$t(row.status === 1 ? 'button.disable' : 'button.enable')]), this.$t('tip.tips'), {
      confirmButtonText: this.$t('button.confirm'),
      cancelButtonText: this.$t('button.cancel'),
      type: 'warning'
    })
      .then(() => {
        const params = {
          key: row.id!,
          value: row.status === 1 ? 0 : 1
        }
        setStatus(params).then(r => {
          if (r) {
            this.$message({
              message: this.$t('tip.success'),
              type: 'success'
            })
            this.getList()
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
  selectionHandle(val: User.Vo[]): void {
    this.selection = val
  }

  /**
   * @description: 分页变化事件
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  pageChangeHandle(data: IPage): void {
    this.page.current = data.current
    this.page.size = data.size
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.role-name-span + .role-name-span {
  margin-left: 10px;
}
</style>
