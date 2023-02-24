<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.subject" placeholder="标题" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.from" placeholder="发送邮箱" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.to" placeholder="收件邮箱" clearable />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-button
            v-permission="'mail:create'"
            type="primary"
            @click="addHandle()">发送邮件</el-button>
          <el-button
            v-permission="'mail:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
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
        <el-table-column type="expand">
          <template #default="{row}">
            <div v-html="row.content" />
          </template>
        </el-table-column>
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="发送邮箱"
          prop="from_email"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="收件邮箱"
          prop="to_email"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="标题"
          prop="subject"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="附件"
          prop="enclosure"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="100">
          <template v-slot="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status_dict }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="created_at"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="80"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'mail:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Add ref="refAdd" v-if="visible" @refresh="getList" />
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import Add from './components/add.vue'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { clearJson, parseDate2Str } from '@/utils'

import { pageApi, delApi } from '@/api/mail'

const { page } = usePage()
const { getDictionary } = useDictionary()

const refForm = ref()
const refTable = ref()
const refAdd = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  subject: '',
  from: '',
  to: '',
  date: []
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
  const params = {
    ...form,
    start: form.date && form.date.length ? parseDate2Str(form.date[0]) : '',
    end: form.date && form.date.length ? parseDate2Str(form.date[1]) : '',
    current: page.current,
    size: page.size
  }
  delete params.date
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
 * @description: 重新获取、重置 数据
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const reacquireHandle = () => {
  page.current = 1
  getList()
}

/**
 * @description: 发送邮件弹窗
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const addHandle = () => {
  visible.value = true
  nextTick(() => {
    refAdd.value.init()
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
    delApi({ keys: ids }).then(r => {
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
 * @description: table多选事件
 * @param {*} val
 * @return {*}
 * @author: gumingchen
 */
const selectionHandle = val => {
  selection.value = val
}

/**
 * @description: 分页变化事件
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const pageChangeHandle = argPage => {
  page.current = argPage.current
  page.size = argPage.size
  getList()
}

onBeforeMount(() => {
  getDictionary('operation')
  getList()
})
</script>
