<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import TenantSidebar from '@/components/tenant-sidebar/index.vue'

import { Status } from '@enums'

import { pageApi, logoutApi } from '@/api/online'

defineOptions({
  name: 'InfrastructureOnline'
})

const refContainerSidebar = ref()
const refTable = ref()

const loading = ref(false)
const visible = ref(false)
const form = reactive({
  tenantId: ''
})
const page = reactive({
  current: 1,
  size: 10,
  total: 0
})
const list = ref([])

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*}
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
 * @description: 强制退出
 * @param {number} id
 * @return {*}
 */
const logoutHandle = id => {
  ElMessageBox.confirm(`确定对[id=${ id }]进行[强制退出]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    logoutApi({ adminerId: id }).then(r => {
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

const changeHandle = _val => {
  refContainerSidebar.value.setScrollTop()
  getList()
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <TenantSidebar v-model="form.tenantId" @change="changeHandle" />
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        border>
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80"
          show-overflow-tooltip />
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
          label="是否是租户"
          prop="isTenant"
          width="100">
          <template v-slot="{row}">
            <el-tag type="success" v-if="row.isTenant">是</el-tag>
            <el-tag v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="所属租户"
          prop="tenant"
          show-overflow-tooltip>
          <template v-slot="{row}">
            {{ row.tenant ? row.tenant.name || '-' : '-' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="登录时间"
          prop="loginAt"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="80"
          fixed="right"
          v-permission="'online:logout'">
          <template v-slot="{ row }">
            <el-button
              v-permission="'online:logout'"
              type="danger"
              link
              @click="logoutHandle(row.id)">强制退出</el-button>
          </template>
        </el-table-column>
      </el-table>
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
