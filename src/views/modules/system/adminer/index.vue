<template>
  <Container ref="containerRef" :class="n.b()">
    <template #sidebar>
      <Sidebar v-model="form.deptId" @change="onChange" />
    </template>
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.nickname" placeholder="昵称" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.mobile" placeholder="手机号" clearable />
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
          <el-button v-permission="'adminer:create'" type="primary" @click="onAddOrEdit()">新增</el-button>
          <el-button v-permission="'adminer:delete'" type="danger" :disabled="!selection.length" @click="onDelete()">批量删除</el-button>
          <el-button v-permission="'adminer:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="头像" prop="avatar" width="80">
        <template v-slot="{row}">
          <el-image
            v-if="row.avatar"
            class="s-50"
            fit="cover"
            :src="row.avatar"
            preview-teleported
            :preview-src-list="[row.avatar]" />
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" prop="username" show-overflow-tooltip />
      <el-table-column align="center" label="昵称" prop="nickname" show-overflow-tooltip>
        <template v-slot="{row}">
          {{ row.nickname || '-' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" prop="sex" width="80">
        <template v-slot="{ row }">
          <el-tag :type="row.sex_type">{{ row.sex_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" prop="mobile" width="120">
        <template v-slot="{row}">
          {{ row.mobile || '-' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" prop="email" show-overflow-tooltip>
        <template v-slot="{row}">
          {{ row.email || '-' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门" prop="deptName" show-overflow-tooltip>
        <template v-slot="{row}">
          {{ row.deptName || '-' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status" width="80">
        <template v-slot="{row}">
          <el-switch
            v-permission="'adminer:status'"
            :before-change="onStatusBeforeChange.bind(this, row)"
            @change="onStatusChange(row)"
            v-model="row.status"
            :active-value="STATUS_ENUM.ENABLE"
            :inactive-value="STATUS_ENUM.DISABLE" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" width="170" />
      <el-table-column v-permission="'adminer:update|adminer:role|adminer:reset|adminer:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'adminer:update'" type="primary" link @click="onAddOrEdit(row.id)">编辑</el-button>
            <el-dropdown
              trigger="click"
              @command="(command) => onCommand(command, row.id)"
              v-permission="'adminer:role|adminer:reset|adminer:delete'">
              <el-button class="margin_l-12" type="primary" link>更多</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="role" v-if="hasPermission('adminer:role')">分配角色</el-dropdown-item>
                  <el-dropdown-item command="reset" v-if="hasPermission('adminer:reset')">重置密码</el-dropdown-item>
                  <el-dropdown-item command="delete" v-if="hasPermission('adminer:delete')">删除</el-dropdown-item>
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
    <Role ref="roleRef" @confirm="getData" />
  </Container>
</template>

<script setup>
import { Container, Dict, DateRangePicker, Pagination } from '@/components'
import { Sidebar, AddEdit, Role } from './components'
import { useNamespace } from '@/hooks'
import { STATUS_ENUM, DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { hasPermission } from '@/permission'
import { clearJson, download } from '@/common/utils'
import { adminerPageApi, adminerDeleteApi, adminerSetStatusApi, adminerExportApi, adminerResetPasswordApi } from '@/apis'

const n = useNamespace('adminer')

const containerRef = useTemplateRef('containerRef')
const addEditRef = useTemplateRef('addEditRef')
const roleRef = useTemplateRef('roleRef')

const loading = ref(false)

const form = reactive({
  deptId: '',
  username: '',
  nickname: '',
  mobile: '',
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
  adminerPageApi(params).then(r => {
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
    adminerDeleteApi({ keys: ids }).then(r => {
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
  adminerSetStatusApi(params).then(r => {
    if (r) {
      ElMessage.success('操作成功!')
    } else {
      row.status = row.status === STATUS_ENUM.DISABLE ? STATUS_ENUM.ENABLE : STATUS_ENUM.DISABLE
    }
  })
}

const onExport = () => {
  adminerExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const handleResetPassword = (id) => {
  ElMessageBox.confirm(
    `确定对[id=${ id }]进行[重置密码]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    adminerResetPasswordApi({ id }).then(r => {
      if (r) {
        ElMessageBox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '重置后的密码：'),
            h('i', { style: 'font-weight: 600' }, r.data)
          ]),
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {}).catch(() => {})
      }
    })
  }).catch(() => {
    // to do something on canceled
  })
}

const onCommand = (command, id) => {
  if (command === 'role') {
    roleRef.value.open(id)
  } else if (command === 'reset') {
    handleResetPassword(id)
  } else if (command === 'delete') {
    onDelete(id)
  }
}

const onAddOrEdit = (id) => {
  addEditRef.value.open(id)
}

const onChange = () => {
  containerRef.value.setScrollTop()
  getData()
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: adminer#{$element-separator};
@include b(adminer) {}
</style>
