<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import { clearJson, havePermission } from '@/utils'

import { pageApi, generateApi } from '@/api/generator'

defineOptions({
  name: 'DevelopGenerator'
})

const refForm = ref()
const refTable = ref()

const loading = ref(false)
const form = reactive({
  name: '',
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
 * @description: 生成代码
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const generateHandle = (name) => {
  const names = name ? [name] : selection.value.map(item => item.name)
  generateApi({ keys: names })
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
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button
            v-permission="'generator:generate'"
            type="primary"
            @click="generateHandle()"
            :disabled="selection.length <= 0">批量生成</el-button>
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
          label="表名"
          prop="name" />
        <el-table-column
          align="center"
          label="引擎"
          prop="engine" />
        <el-table-column
          align="center"
          label="字符集"
          prop="collation" />
        <el-table-column
          align="center"
          label="注释"
          prop="comment" />
        <el-table-column
          align="center"
          label="行数"
          prop="rows" />
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
          v-permission="'generator:generate'"
          align="center"
          label="操作"
          width="80"
          fixed="right">
          <template v-slot="{ row }">
            <div class="flex flex_j_c-center">
              <el-button
                v-permission="'generator:generate'"
                type="primary"
                link
                @click="generateHandle(row.name)">生成</el-button>
            </div>
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
  </Container>
</template>
