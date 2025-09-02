<template>
  <Container :class="n.b()">
    <template #sidebar>
      <Sidebar v-model="active" @change="onChange" />
    </template>
    <template v-if="hasPermission('dictSub:create|dictSub:delete')" #headbar>
      <div class="pb-15">
        <el-button v-permission="'dictSub:create'" type="primary" :disabled="!active" @click="onAddOrEdit()">新增</el-button>
        <el-button v-permission="'dictSub:delete'" type="danger" :disabled="!selection.length || !active" @click="onDelete()">批量删除</el-button>
      </div>
    </template>
    <el-table v-loading="loading" :data="list" @selection-change="onSelectionChange" border>
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="编码" prop="code" width="60" />
      <el-table-column align="center" label="元素颜色类型" prop="elType" min-width="110" />
      <el-table-column align="center" label="元素CssClass" prop="elClass" min-width="120" />
      <el-table-column align="center" label="排序" prop="sort" />
      <el-table-column align="center" label="是否启用" prop="status" width="100">
        <template v-slot="{ row }">
          <el-switch
            v-permission="'dictSub:status'"
            v-model="row.status"
            :active-value="STATUS_ENUM.ENABLE"
            :inactive-value="STATUS_ENUM.DISABLE"
            @change="onStatusChange(row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" width="170" />
      <el-table-column v-permission="'dictSub:update|dictSub:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <el-button v-permission="'dictSub:update'" type="primary" link @click="onAddOrEdit(row.id)">编辑</el-button>
          <el-button v-permission="'dictSub:delete'" type="danger" link @click="onDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddEditSub ref="addEditSubRef" @confirm="getData" />
  </Container>
</template>

<script setup>
import { Container } from '@/components'
import { Sidebar, AddEditSub } from './components'
import { hasPermission } from '@/permission'
import { STATUS_ENUM } from '@/common/enums'
import { dictSubListApi, dictSubDeleteApi, dictSubSetStatusApi } from '@/apis'
import { useNamespace } from '@/hooks';

const n = useNamespace('dict')

const addEditSubRef = useTemplateRef('addEditSubRef')

const loading = ref(false)
const active = ref('')
const list = ref([])
const selection = ref([])

const getData = () => {
  loading.value = true
  dictSubListApi({ id: active.value }).then(r => {
    if (r) {
      list.value = r.data
    }
    nextTick(() => loading.value = false)
  })
}

const onChange = () => {
  if (active.value) {
    getData()
  } else {
    list.value = []
  }
  selection.value = []
}

const onSelectionChange = (value) => {
  selection.value = value
}

const onAddOrEdit = (id) => {
  addEditSubRef.value.open(active.value, id)
}
const onDelete = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(
    `确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    dictSubDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onStatusChange = (row) => {
  const params = { key: row.id, value: row.status }
  dictSubSetStatusApi(params).then(r => {
    if (r) {
      ElMessage.success('操作成功!')
    } else {
      row.status = row.status === STATUS_ENUM.DISABLE ? STATUS_ENUM.ENABLE : STATUS_ENUM.DISABLE
    }
  })
}

</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(dict) {}
</style>

