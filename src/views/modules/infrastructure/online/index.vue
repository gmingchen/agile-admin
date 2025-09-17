<template>
  <Container ref="containerRef" :class="n.b()">
    <template #sidebar>
      <TenantSidebar v-model="tenantId" @change="onChange" />
    </template>
    <el-table v-loading="loading" :data="list" border>
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
      <el-table-column align="center" label="是否是租户" prop="isTenant" width="100">
        <template v-slot="{row}">
          <el-tag type="success" v-if="row.isTenant">是</el-tag>
          <el-tag v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属租户" prop="tenant" show-overflow-tooltip>
        <template v-slot="{row}">
          {{ row.tenant ? row.tenant.name || '-' : '-' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录时间" prop="loginAt" width="170" />
      <el-table-column v-permission="'online:logout'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'online:logout'" type="danger" link @click="onLogout(row.id)">强制退出</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
  </Container>
</template>

<script setup>
import { Container, TenantSidebar, Pagination } from '@/components'
import { useNamespace } from '@/hooks'
import { onlinePageApi, onlineLogoutApi } from '@/apis'

const n = useNamespace('online')

const containerRef = useTemplateRef('containerRef')

const loading = ref(false)
const tenantId = ref('')
const page = reactive({
  current: 1,
  size: 10,
  total: 0
})
const list = ref([])

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { tenantId: tenantId.value, current, size }
  onlinePageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => loading.value = false)
  })
}

const onChange = () => {
  containerRef.value.setScrollTop()
  getData()
}

const onPaginationChange = () => {
  getData()
}

const onLogout = (id) => {
  ElMessageBox.confirm(
    `确定对[id=${ id }]进行[强制退出]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    onlineLogoutApi({ adminerId: id }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: online#{$element-separator};
@include b(online) {}
</style>
