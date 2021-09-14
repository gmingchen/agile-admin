<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-21 22:52:19
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-28 22:36:10
-->
<template>
  <div class="g-container">
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-input v-model="form.key" placeholder="键" clearable />
      </el-form-item>
      <el-form-item>
        <el-button v-repeat @click="reacquireHandle()">查询</el-button>
        <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
        <el-button v-permission="'backstage:config:create'" type="primary" @click="addEditHandle()">新增</el-button>
        <el-button
          v-permission="'backstage:config:delete'"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0">批量删除</el-button>
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
        label="名称"
        prop="name"
        min-width="150" />
      <el-table-column
        align="center"
        label="键"
        prop="json_key"
        min-width="120" />
      <el-table-column
        align="center"
        label="Json值"
        prop="json_value"
        min-width="200px"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="备注"
        prop="remark"
        min-width="200px" />
      <el-table-column
        align="center"
        label="状态"
        prop="status"
        width="80px">
        <template v-slot="{ row }">
          <el-tag v-if="row.status === 1" type="success">启用</el-tag>
          <el-tag v-if="row.status === 0" type="info">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        label="操作"
        width="120"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-if="row.status === 0"
            v-permission="'backstage:config:status'"
            type="text"
            size="small"
            @click="statusHandle(row)">启用</el-button>
          <el-button
            v-permission="'backstage:config:update'"
            type="text"
            size="small"
            @click="addEditHandle(row.id)">编辑</el-button>
          <el-button
            v-permission="'backstage:config:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-edit ref="refAddEdit" v-if="visible" @refresh="getList" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import usePage from '@/mixins/page'
import useInstance from '@/mixins/instance'
import AddEdit from './components/add-edit.vue'
import { clearJson } from '@/utils'
import { delApi, listApi, statusApi } from '@/api/develop/config'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const { $message, $confirm } = useInstance()

    const refForm = ref()
    const refAddEdit = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        key: ''
      },
      list: [],
      selection: []
    })

    const getList = () => {
      data.loading = true
      listApi(data.form).then(r => {
        if (r) {
          data.list = r.data
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    /**
     * @description: 重新获取、重置 数据
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const reacquireHandle = () => {
      page.current = 1
      getList()
    }

    /**
     * @description: 新增/编辑弹窗
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const addEditHandle = id => {
      data.visible = true
      nextTick(() => {
        refAddEdit.value.init(id)
      })
    }

    /**
     * @description: 删除
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const delHandle = id => {
      let params
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id)
      }
      $confirm(`确定对[id=${ params.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delApi(params).then(r => {
          if (r) {
            $message({
              message: '操作成功!',
              type: 'success'
            })
            getList()
          }
        })
      }).catch(() => {
        // to do something on canceled
      })
    }

    /**
     * @description: 状态
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const statusHandle = row => {
      $confirm(`'确定对[id=${ row.id }]进行[${ row.status === 1 ? '禁用' : '启用' }]操作`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          key: row.id,
          value: row.status === 1 ? 0 : 1
        }
        statusApi(params).then(r => {
          if (r) {
            $message({
              message: '操作成功!',
              type: 'success'
            })
            getList()
          }
        })
      }).catch(() => {
        // to do something on canceled
      })
    }

    /**
     * @description: table多选事件
     * @param {*} val
     * @return {*}
     * @author: gumingchen
     */
    const selectionHandle = val => {
      data.selection = val
    }

    /**
     * @description: 分页变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const pageChangeHandle = argPage => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      refForm,
      refAddEdit,
      page,
      ...toRefs(data),
      getList,
      reacquireHandle,
      addEditHandle,
      delHandle,
      statusHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
