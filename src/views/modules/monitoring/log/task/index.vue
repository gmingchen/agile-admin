<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.bean" placeholder="操作" clearable />
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
            v-permission="'quartz:timedTaskLog:truncate'"
            type="danger"
            :disabled="page.total == 0"
            @click="clearHandle()">清空日志</el-button>
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
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="任务ID"
          prop="timed_task_id"
          width="80" />
        <el-table-column
          align="center"
          label="Spring Bean"
          prop="bean" />
        <el-table-column
          align="center"
          label="参数"
          prop="params" />
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="100">
          <template v-slot="{row}">
            <el-tag v-if="row.status === 1">{{dictionaryMap[row.status]}}</el-tag>
            <el-tag v-if="row.status === 0" type="info">{{dictionaryMap[row.status]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="信息"
          prop="message"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="执行时长"
          prop="times"
          width="120" />
        <el-table-column
          align="center"
          label="执行时间"
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
import useDictionary from '@/mixins/dictionary'
import { clearJson, parseDate2Str } from '@/utils'

import { pageApi, truncateApi } from '@/api/timed-task-log'

const { page } = usePage()
const { dictionaryMap, getDictionary } = useDictionary()

const refForm = ref()
const refTable = ref()
const loading = ref(false)
const form = reactive({
  bean: '',
  date: []
})
const list = ref([])

const getList = () => {
  const params = {
    bean: form.bean,
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

const clearHandle = () => {
  ElMessageBox.confirm(`确定进行[清空]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    truncateApi().then(r => {
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

const pageChangeHandle = (argPage) => {
  page.current = argPage.current
  page.size = argPage.size
  getList()
}

onBeforeMount(() => {
  getDictionary('operation')
  getList()
})
</script>

<style lang="scss" scoped>
</style>
