<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.name" placeholder="表名" clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">搜索</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-button
            v-permission="'generator:create'"
            type="danger"
            :disabled="selection.length <= 0"
            @click="generateHandle()">批量生成</el-button>
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
          label="总行数"
          prop="rows" />
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
          label="创建时间"
          prop="created_at"
          width="160" />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updated_at"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="80"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'generator:create'"
              type="primary"
              link
              @click="generateHandle(row.name)">生成</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref } from 'vue'

import usePage from '@/mixins/page'
import { clearJson } from '@/utils'

import { pageApi, generatorApi } from '@/api/generator'

const { page } = usePage()

const refForm = ref()
const refTable = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  name: ''
})
const list = ref([])
const selection = ref([])

const getList = () => {
  const params = {
    ...form,
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

const selectionHandle = (val) => {
  selection.value = val
}

const generateHandle = (name) => {
  const names = name ? [name] : selection.value.map(item => {
    return item.name
  })
  generatorApi(names)
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
.el-tag + .el-tag {
  margin-left: 5px;
}
</style>
