<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.name" placeholder="用户名/昵称" clearable />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="-"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">搜索</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-button
            v-permission="'loginLog:delete'"
            type="danger"
            :disabled="page.total == 0"
            @click="deleteHandle()">删除所有日志</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        @row-dblclick="rowClickHandle"
        row-key="id"
        border>
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="帐号"
          prop="account" />
        <el-table-column
          align="center"
          label="登录信息"
          prop="message" />
        <el-table-column
          align="center"
          label="管理员"
          prop="username"
          width="180">
          <template v-slot="{ row }">
            <div class="flex-box flex_j_c-center flex_a_i-center">
              <el-avatar
                class="margin_r-10"
                :size="50"
                :src="row.avatar"
                v-if="row.avatar" />
              <div class="ellipse">{{row.nickname || row.username }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="IP"
          prop="ip"
          width="120" />
        <el-table-column
          align="center"
          label="浏览器"
          prop="browser"
          width="140" />
        <el-table-column
          align="center"
          label="操作系统"
          prop="operating_system" />
        <el-table-column
          align="center"
          label="操作时间"
          prop="created_at"
          width="160" />
      </el-table>
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'

import usePage from '@/mixins/page'
import { clearJson, parseDate2Str } from '@/utils'

import { pageApi, deleteApi } from '@/api/login-log'

const { page } = usePage()

const refForm = ref()
const refTable = ref()
const loading = ref(false)
const form = reactive({
  name: '',
  date: []
})
const list = ref([])

const getList = () => {
  const params = {
    name: form.name,
    start: form.date && form.date.length > 0 ? parseDate2Str(form.date[0]) : '',
    end: form.date && form.date.length > 1 ? parseDate2Str(form.date[1]) : '',
    current: page.current,
    size: page.size
  }
  loading.value = true
  pageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => { loading.value = false })
  })
}

const reacquireHandle = () => {
  page.current = 1
  getList()
}

const deleteHandle = () => {
  ElMessageBox.confirm(`确定进行[删除]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteApi().then(r => {
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

const rowClickHandle = (row) => {
  refTable.value.toggleRowExpansion(row)
}

const pageChangeHandle = (argPage) => {
  page.current = argPage.current
  page.size = argPage.size
  getList()
}

onBeforeMount(() => {
  getList()
})
</script>

<style lang="scss" scoped>
</style>
