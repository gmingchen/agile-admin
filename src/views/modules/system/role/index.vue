<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">搜索</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-button v-permission="'backstage:role:create'" type="primary" @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'backstage:role:delete'"
            type="danger"
            :disabled="selection.length <= 0"
            @click="deleteHandle()">批量删除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        v-loading="loading"
        :data="list"
        @selection-change="selectionHandle"
        border>
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="角色名称"
          prop="name" />
        <el-table-column
          align="center"
          label="备注"
          prop="remark" />
        <el-table-column
          v-if="havePermission('backstage:role:show')"
          align="center"
          label="是否显示"
          prop="show"
          width="160">
          <template v-slot="{ row }">
            <el-switch
              v-permission="'backstage:role:show'"
              @change="showHandle(row)"
              v-model="row.show"
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
          width="100"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'backstage:role:update'"
              type="text"
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'backstage:role:delete'"
              type="text"
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit'

import usePage from '@/mixins/page'
import { clearJson, havePermission } from '@/utils'

import { pageApi, deleteApi, setShowApi } from '@/api/role'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const refForm = ref()
    const refTable = ref()
    const refAddEdit = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        name: ''
      },
      list: [],
      selection: []
    })

    const getList = () => {
      const params = {
        ...data.form,
        current: page.current,
        size: page.size
      }
      data.loading = true
      pageApi(params).then(r => {
        if (r) {
          data.list = r.data.list,
          page.total = r.data.total
        }
        nextTick(() => { data.loading = false })
      })
    }

    const reacquireHandle = () => {
      page.current = 1
      getList()
    }

    const addEditHandle = (id) => {
      data.visible = true
      nextTick(() => {
        refAddEdit.value.init(id)
      })
    }

    const deleteHandle = (id) => {
      const params = id ? [id] : data.selection.map(item => item.id)
      ElMessageBox.confirm(`确定对[id=${ params.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApi(params).then(r => {
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

    const showHandle = (row) => {
      const params = {
        key: row.id,
        value: row.show
      }
      setShowApi(params).then(r => {
        if (r) {
          ElMessage({
            message: '操作成功!',
            type: 'success'
          })
        } else {
          row.show = row.show === 1 ? 0 : 1
        }
      })
    }

    const selectionHandle = (val) => {
      data.selection = val
    }

    const pageChangeHandle = (argPage) => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      refForm,
      refTable,
      refAddEdit,
      page,
      ...toRefs(data),
      getList,
      pageChangeHandle,
      reacquireHandle,
      addEditHandle,
      deleteHandle,
      showHandle,
      selectionHandle,
      clearJson,
      havePermission
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
