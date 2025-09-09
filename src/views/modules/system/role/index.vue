<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <Dict class="w-177_i" v-model="form.status" :code="DICT_CODE_ENUM.STATUS" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="状态" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'role:create'" type="primary" @click="onAddOrEdit()">新增</el-button>
          <el-button v-permission="'role:delete'" type="danger" :disabled="!selection.length" @click="onDelete()">批量删除</el-button>
          <el-button v-permission="'role:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="数据权限" prop="dataScope" width="120">
        <template v-slot="{ row }">
          <el-tag :type="row.dataScope_type">{{ row.dataScope_dict || '未设置' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" prop="sort" />
      <el-table-column align="center" label="备注" prop="remark" show-overflow-tooltip />
      <el-table-column align="center" label="状态" prop="status" width="80">
        <template v-slot="{row}">
          <el-switch
            v-permission="'role:status'"
            :before-change="onStatusBeforeChange.bind(this, row)"
            @change="onStatusChange(row)"
            v-model="row.status"
            :active-value="STATUS_ENUM.ENABLE"
            :inactive-value="STATUS_ENUM.DISABLE" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" width="170" />
      <el-table-column v-permission="'role:update|role:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'role:update'" type="primary" link @click="onAddOrEdit(row.id)">编辑</el-button>
            <el-dropdown
              trigger="click"
              @command="(command) => onCommand(command, row.id)"
              v-permission="'role:menu|role:data|role:delete'">
              <el-button class="margin_l-12" type="primary" link>更多</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="permission" v-if="hasPermission('role:menu')">权限</el-dropdown-item>
                  <el-dropdown-item command="dataPermission" v-if="hasPermission('role:data')">数据权限</el-dropdown-item>
                  <el-dropdown-item command="delete" v-if="hasPermission('role:delete')">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
    <AddEdit ref="addEditRef" @confirm="getData" />
    <Permission ref="permissionRef" @confirm="getData" />
    <DataPermission ref="dataPermissionRef" @confirm="getData" />
  </Container>
</template>

<script setup>
import { Container, Dict, DateRangePicker, Pagination } from '@/components'
import { AddEdit, Permission, DataPermission } from './components'
import { useNamespace } from '@/hooks'
import { STATUS_ENUM, DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { hasPermission } from '@/permission'
import { clearJson, download } from '@/common/utils'
import { rolePageApi, roleDeleteApi, roleSetStatusApi, roleExportApi} from '@/apis'

const n = useNamespace('role')

const addEditRef = useTemplateRef('addEditRef')
const permissionRef = useTemplateRef('permissionRef')
const dataPermissionRef = useTemplateRef('dataPermissionRef')

const loading = ref(false)
const form = reactive({
  name: '',
  status: '',
  start: '',
  end: ''
})
const page = reactive({
  current: 1,
  size: 10,
  total: 0
})
const list = ref([])
const selection = ref([])

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { ...form, current, size }
  rolePageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => loading.value = false)
  })
}

const handleReacquire = () => {
  page.current = 1
  getData()
}

const onSearch = () => {
  handleReacquire()
}

const onReset = () => {
  clearJson(form)
  handleReacquire()
}

const onEnterKeyup = () => {
  handleReacquire()
}

const onPaginationChange = () => {
  getData()
}

const onSelectionChange = value => {
  selection.value = value
}

const onDelete = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(
    `确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    roleDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onStatusBeforeChange = (row) => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(
      `确定对[id=${ row.id }]进行[${ row.status === STATUS_ENUM.ENABLE ? '禁用' : '启用' }]操作?`,
      { title: '提示', confirmButtonText: '确认', type: 'warning' }
    ).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}

const onStatusChange = (row) => {
  const params = {
    key: row.id,
    value: row.status
  }
  roleSetStatusApi(params).then(r => {
    if (r) {
      ElMessage.success('操作成功!')
    } else {
      row.status = row.status === STATUS_ENUM.DISABLE ? STATUS_ENUM.ENABLE : STATUS_ENUM.DISABLE
    }
  })
}

const onExport = () => {
  roleExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onCommand = (command, id) => {
  if (command === 'permission') {
    permissionRef.value.open(id)
  } else if (command === 'dataPermission') {
    dataPermissionRef.value.open(id)
  } else if (command === 'delete') {
    onDelete(id)
  }
}

const onAddOrEdit = (id) => {
  addEditRef.value.open(id)
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: role#{$element-separator};
@include b(role) {}
</style>
