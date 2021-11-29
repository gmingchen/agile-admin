<template>
  <drawer
    v-model="visible"
    title="配置"
    :fixed="false"
    size="700px">
    <el-button
      v-permission="'backstage:dictionary:detail:create'"
      type="primary"
      @click="addEditHandle()">新增</el-button>
    <el-button
      v-permission="'backstage:dictionary:detail:delete'"
      type="danger"
      @click="delHandle()"
      :disabled="selection.length <= 0">批量删除</el-button>
    <el-table
      border
      class="g-table margin_t-20"
      element-loading-spinner="el-icon-loading"
      v-loading="loading"
      :data="list"
      @selection-change="selectionHandle">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column
        align="center"
        label="编码"
        prop="code"
        min-width="120"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="名称"
        prop="name"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="操作"
        width="100"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'backstage:dictionary:detail:update'"
            type="text"
            @click="addEditHandle(row.id)">编辑</el-button>
          <el-button
            v-permission="'backstage:dictionary:detail:delete'"
            type="text"
            @click="delHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-edit ref="refAddEdit" v-if="addEditVisible" @refresh="getList" />
  </drawer>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, nextTick } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import Drawer from '@/components/drawer'
import AddEdit from './add-edit-set.vue'

import { listApi, delApi } from '@/api/develop/dictionary/detail'

export default defineComponent({
  components: { Drawer, AddEdit },
  setup() {
    const refAddEdit = ref()

    const data = reactive({
      visible: false,
      loading: false,
      addEditVisible: false,
      dictionaryId: '', // 字典ID
      list: [],
      selection: []
    })

    /**
     * @description: 获取分页列表
     * @param {*}
     * @return {*}
     * @Author: gumingchen
     */
    const getList = () => {
      const params = {
        id: data.dictionaryId
      }
      data.loading = true
      listApi(params).then(r => {
        if (r) {
          data.list = r.data
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    /**
     * @description: 新增/编辑弹窗
     * @param {*}
     * @return {*}
     * @Author: gumingchen
     */
    const addEditHandle = id => {
      data.addEditVisible = true
      nextTick(() => {
        refAddEdit.value.init(data.dictionaryId, id)
      })
    }

    /**
     * @description: 删除
     * @param {number} id
     * @return {*}
     * @Author: gumingchen
     */
    const delHandle = id => {
      let params
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id)
      }
      ElMessageBox.confirm(`确定对[id=${ params.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delApi(params).then(r => {
          if (r) {
            ElMessage({
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
     * @Author: gumingchen
     */
    const selectionHandle = val => {
      data.selection = val
    }

    /**
     * @description: 初始化
     * @param {*} id 字典ID
     * @return {*}
     * @Author: gumingchen
     */
    const init = (id) => {
      data.visible = true
      data.dictionaryId = id
      getList()
    }

    return {
      refAddEdit,
      ...toRefs(data),
      init,
      getList,
      addEditHandle,
      delHandle,
      selectionHandle
    }
  }
})
</script>

<style>

</style>
