<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import Sidebar from './components/sidebar.vue'
import AddEdit from './components/add-edit.vue'
import SetRole from './components/set-role.vue'

import { clearJson, havePermission } from '@utils'
import { Status } from '@enums'

import { pageApi, deleteApi, setStatusApi, resetPasswordApi, exportApi } from '@/api/adminer'

defineOptions({
  name: 'SystemAdminer'
})

const refContainerSidebar = ref()
const refForm = ref()
const refTable = ref()
const refAddEdit = ref()
const refSetRole = ref()

const loading = ref(false)
const visible = ref(false)
const roleVisible = ref(false)
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

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const getList = () => {
  const { current, size } = page
  const params = {
    ...form,
    current,
    size
  }
  loading.value = true
  pageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

/**
 * @description: 重新获取数据
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const reacquireHandle = () => {
  page.current = 1
  getList()
}
/**
 * @description: 重置并重新获取数据
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const resetHandle = () => {
  clearJson(form)
  reacquireHandle()
}

/**
 * @description: 新增/编辑弹窗
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const addEditHandle = id => {
  visible.value = true
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
const deleteHandle = id => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteApi({ keys: ids }).then(r => {
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
 * 变化之前操作
 * @param {*} row
 */
const statusBefore = row => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(`确定对[id=${ row.id }]进行[${ row.status === Status.ENABLE ? '禁用' : '启用' }]操作`, '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}
/**
 * @description: 状态切换
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const statusHandle = row => {
  const params = {
    key: row.id,
    value: row.status
  }
  setStatusApi(params).then(r => {
    if (r) {
      ElMessage({
        message: '操作成功!',
        type: 'success'
      })
    } else {
      row.status = row.status === Status.DISABLE ? Status.ENABLE : Status.DISABLE
    }
  })
}

/**
 * @description: 分配角色
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const setRoleHandle = id => {
  roleVisible.value = true
  nextTick(() => {
    refSetRole.value.init(id)
  })
}

/**
 * @description: 重置密码
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const resetPasswordHandle = id => {
  ElMessageBox.confirm(`确定对[id=${ id }]进行[重置密码]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    resetPasswordApi({ id }).then(r => {
      if (r) {
        ElMessageBox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '重置后的密码：'),
            h('i', { style: 'font-weight: 600' }, r.data)
          ]),
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          // to do something on confirmed
        }).catch(() => {
          // to do something on canceled
        })
      }
    })
  }).catch(() => {
    // to do something on canceled
  })
}

const commandHandle = (command, id) => {
  switch (command) {
    case 'role':
      setRoleHandle(id)
      break
    case 'reset':
      resetPasswordHandle(id)
      break
    case 'delete':
      deleteHandle(id)
      break
  }
}

/**
 * @description: 导出
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const exportHandle = () => {
  exportApi(form)
}

/**
 * 侧边栏选择变化事件
 */
const changeHandle = (_row) => {
  refContainerSidebar.value.setScrollTop()
  getList()
}

/**
 * @description: table多选事件
 * @param {*} val
 * @return {*}
 * @author: gumingchen
 */
const selectionHandle = val => {
  selection.value = val
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <Sidebar v-model="form.deptId" @change="changeHandle" />
    </template>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <DictSelect v-model="form.status" code="STATUS" placeholder="状态" />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button
            v-permission="'adminer:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'adminer:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
          <el-button v-repeat v-permission="'adminer:export'" @click="exportHandle">导出</el-button>
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
          label="头像"
          prop="avatar"
          width="80">
          <template v-slot="{row}">
            <el-image
              v-if="row.avatar"
              class="height-50 width-50"
              fit="cover"
              :src="row.avatar"
              preview-teleported
              :preview-src-list="[row.avatar]" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="用户名"
          prop="username"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="昵称"
          prop="nickname"
          show-overflow-tooltip>
          <template v-slot="{row}">
            {{ row.nickname || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="性别"
          prop="sex"
          width="80">
          <template v-slot="{ row }">
            <el-tag :type="row.sex_type">{{ row.sex_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="手机号"
          prop="mobile"
          width="120">
          <template v-slot="{row}">
            {{ row.mobile || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="邮箱"
          prop="email"
          show-overflow-tooltip>
          <template v-slot="{row}">
            {{ row.email || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="部门"
          prop="deptName"
          show-overflow-tooltip>
          <template v-slot="{row}">
            {{ row.deptName || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="80">
          <template v-slot="{row}">
            <el-switch
              v-permission="'adminer:status'"
              :before-change="statusBefore.bind(this, row)"
              @change="statusHandle(row)"
              v-model="row.status"
              :active-value="Status.ENABLE"
              :inactive-value="Status.DISABLE" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="createdAt"
          width="160" />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updatedAt"
          width="160" />
        <el-table-column
          v-permission="'adminer:update|adminer:role|adminer:reset|adminer:delete'"
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <div class="flex flex_j_c-center">
              <el-button
                v-permission="'adminer:update'"
                type="primary"
                link
                @click="addEditHandle(row.id)">编辑</el-button>
              <el-dropdown
                trigger="click"
                @command="(command) => commandHandle(command, row.id)"
                v-permission="'adminer:role|adminer:reset|adminer:delete'">
                <el-button class="margin_l-12" type="primary" link>更多</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="role" v-if="havePermission('adminer:role')">分配角色</el-dropdown-item>
                    <el-dropdown-item command="reset" v-if="havePermission('adminer:reset')">重置密码</el-dropdown-item>
                    <el-dropdown-item command="delete" v-if="havePermission('adminer:delete')">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
      <SetRole ref="refSetRole" v-if="roleVisible" />
    </template>
    <template #footer>
      <Page
        v-model:current="page.current"
        v-model:size="page.size"
        :total="page.total"
        @change="getList" />
    </template>
  </ContainerSidebar>
</template>
