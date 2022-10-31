<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <Sidebar v-model="active" @change="changeHandle" />
    </template>
    <template #header v-if="havePermission('dictionarySub:create|dictionarySub:delete', '|')">
      <el-form :inline="true">
        <el-form-item>
          <el-button
            v-permission="'dictionarySub:create'"
            type="primary"
            @click="addEditHandle()"
            :disabled="!active">新增</el-button>
          <el-button
            v-permission="'dictionarySub:delete'"
            type="danger"
            :disabled="selection.length <= 0 || !active"
            @click="deleteHandle()">批量删除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        @selection-change="selectionHandle"
        border>
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column
          align="center"
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="编码"
          prop="code" />
        <el-table-column
          align="center"
          label="是否启用"
          prop="status"
          width="100">
          <template v-slot="{ row }">
            <el-switch
              v-permission="'dictionarySub:status'"
              @change="statusHandle(row)"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="created_at"
          width="160" />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updated_at"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'dictionarySub:update'"
              type="primary"
              link
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'dictionarySub:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <SubAddEdit ref="refSubAddEdit" v-if="visible" @refresh="getList" />
    </template>
  </ContainerSidebar>
</template>

<script >
import { defineComponent, reactive, ref, toRefs, nextTick } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import ContainerSidebar from '@/components/container-sidebar/index.vue'
import Sidebar from './components/sidebar.vue'
import SubAddEdit from './components/sub-add-edit.vue'

import { havePermission } from '@/utils'

import { subListApi, subDeleteApi, subSetStatusApi } from '@/api/dictionary'

export default defineComponent({
  components: { ContainerSidebar, Sidebar, SubAddEdit },
  setup() {
    const refContainerSidebar = ref()
    const refTable = ref()
    const refSubAddEdit = ref()
    const data = reactive({
      active: '',
      loading: false,
      visible: false,
      list: [],
      selection: []
    })

    const getList = () => {
      if (data.active) {
        data.loading = true
        const params = {
          id: data.active
        }
        subListApi(params).then(r => {
          if (r) {
            data.list = r.data
          }
          nextTick(() => { data.loading = false })
        })
      }
    }

    const addEditHandle = (id) => {
      data.visible = true
      nextTick(() => {
        refSubAddEdit.value.init({ dictionaryId: data.active, id })
      })
    }

    const deleteHandle = (id) => {
      const ids = id ? [id] : data.selection.map(item => item.id)
      ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        subDeleteApi({ keys: ids }).then(r => {
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

    const statusHandle = (row) => {
      const params = {
        key: row.id,
        value: row.status
      }
      subSetStatusApi(params).then(r => {
        if (r) {
          ElMessage({
            message: '操作成功!',
            type: 'success'
          })
        } else {
          row.status = row.status === 1 ? 0 : 1
        }
      })
    }

    const selectionHandle = (val) => {
      data.selection = val
    }

    const changeHandle = (row) => {
      refContainerSidebar.value.setScrollTop()
      if (row) {
        getList()
      } else {
        data.list = []
      }
    }
    return {
      refContainerSidebar,
      refTable,
      refSubAddEdit,
      ...toRefs(data),
      getList,
      addEditHandle,
      deleteHandle,
      statusHandle,
      selectionHandle,
      changeHandle,
      havePermission
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
