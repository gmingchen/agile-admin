<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import { clearJson } from '@/utils'
import { Status } from '@/utils/enum'

import { pageApi, exportApi } from '@/api/sign'

const refForm = ref()
const refTable = ref()

const loading = ref(false)
const visible = ref(false)
const form = reactive({
  nickname: '',
  backup: '',
  start: '',
  end: ''
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
 * @description: 重新获取数据
 * @param {*}
 * @return {*}
 */
const reacquireHandle = () => {
  page.current = 1
  getList()
}
/**
 * @description: 重置并重新获取数据
 * @param {*}
 * @return {*}
 */
const resetHandle = () => {
  clearJson(form)
  reacquireHandle()
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

onBeforeMount(() => {
  getList()
})
onActivated(() => {})
</script>

<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <DictSelect v-model="form.backup" code="WHETHER" placeholder="补签" />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button v-repeat v-permission="'sign:export'" @click="exportHandle">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        border>
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
          label="昵称"
          prop="nickname"
          show-overflow-tooltip />
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
          label="签到日期"
          prop="signAt"
          width="160" />
        <el-table-column
          align="center"
          label="连续签到天数"
          prop="duration" />
        <el-table-column
          align="center"
          label="补签"
          prop="backup"
          show-overflow-tooltip>
          <template v-slot="{ row }">
            <el-tag :type="row.backup_type">{{ row.backup_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="createdAt"
          width="160"
          show-overflow-tooltip />
      </el-table>
    </template>
    <template #footer>
      <Page
        v-model:current="page.current"
        v-model:size="page.size"
        :total="page.total"
        @change="getList" />
    </template>
  </Container>
</template>
