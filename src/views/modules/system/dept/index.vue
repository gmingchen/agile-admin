<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.leader" placeholder="用户名、昵称" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.mobile" placeholder="手机号" clearable />
        </el-form-item>
        <el-form-item>
          <Dict class="w-177_i" v-model="form.status" :code="DICT_CODE_ENUM.STATUS" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="状态" clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'dept:create'" type="primary" @click="onAddOrEdit()">新增</el-button>
          <el-button v-permission="'dept:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" :tree-props="props" row-key="id" border>
      <el-table-column align="left" label="名称" prop="name" />
      <el-table-column align="center" label="负责人" prop="nickname">
        <template v-slot="{ row }">
          {{ row.nickname || row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" prop="mobile" />
      <el-table-column align="center" label="数据权限" prop="dataScope" width="120">
        <template v-slot="{ row }">
          <el-tag :type="row.dataScope_type">{{ row.dataScope_dict || '未设置' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" prop="sort" />
      <el-table-column align="center" label="状态" prop="status" width="80">
        <template v-slot="{row}">
          <el-switch
            v-permission="'dept:status'"
            :before-change="onStatusBeforeChange.bind(this, row)"
            @change="onStatusChange(row)"
            v-model="row.status"
            :active-value="STATUS_ENUM.ENABLE"
            :inactive-value="STATUS_ENUM.DISABLE" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" width="170" />
      <el-table-column v-permission="'dept:update|dept:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'dept:update'" type="primary" link @click="onAddOrEdit(row.id)">编辑</el-button>
            <el-dropdown
              trigger="click"
              @command="(command) => onCommand(command, row.id)"
              v-permission="'dept:menu|dept:data|dept:delete'">
              <el-button class="margin_l-12" type="primary" link>更多</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="dataPermission" v-if="hasPermission('dept:data')">数据权限</el-dropdown-item>
                  <el-dropdown-item command="delete" v-if="hasPermission('dept:delete')">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <AddEdit ref="addEditRef" @confirm="getData" />
    <DataPermission ref="dataPermissionRef" @confirm="getData" />
  </Container>
</template>

<script setup>
import { Container, Dict } from '@/components'
import { AddEdit, DataPermission } from './components'
import { useNamespace } from '@/hooks'
import { hasPermission } from '@/permission'
import { STATUS_ENUM, DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { clearJson, download, parseDataToTree } from '@/common/utils'
import { deptListApi, deptDeleteApi, deptSetStatusApi, deptExportApi} from '@/apis'

const n = useNamespace('dept')

const props = {
  children: 'children'
}

const addEditRef = useTemplateRef('addEditRef')
const dataPermissionRef = useTemplateRef('dataPermissionRef')

const loading = ref(false)
const form = reactive({
  name: '',
  leader: '',
  mobile: '',
  status: ''
})
const list = ref([])

const getData = () => {
  loading.value = true
  const params = { ...form }
  deptListApi(params).then(r => {
    if (r) {
      list.value = parseDataToTree(r.data)
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

const onDelete = (id) => {
  ElMessageBox.confirm(
    `确定对[id=${ id }]进行[删除]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    deptDeleteApi({ key: id }).then(r => {
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
  deptSetStatusApi(params).then(r => {
    if (r) {
      ElMessage.success('操作成功!')
    } else {
      row.status = row.status === STATUS_ENUM.DISABLE ? STATUS_ENUM.ENABLE : STATUS_ENUM.DISABLE
    }
  })
}

const onExport = () => {
  deptExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onCommand = (command, id) => {
  if (command === 'dataPermission') {
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
$prefix: dept#{$element-separator};
@include b(dept) {}
</style>
