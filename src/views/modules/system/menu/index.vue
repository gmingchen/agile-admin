<template>
  <Container>
    <template #default>
      <el-table
        ref="refTable"
        :data="list"
        v-loading="loading"
        :tree-props="props"
        row-key="id"
        border>
        <el-table-column
          align="left"
          label="中文名称"
          prop="name_cn"
          min-width="150" />
        <el-table-column
          align="center"
          label="英文名称"
          prop="name_en"
          min-width="150">
          <template v-slot="{ row }">
            {{ row.name_en || '—' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="图标"
          width="80">
          <template v-slot="{ row }">
            <Iconfont v-if="row.type !== 2 && row.icon" :name="row.icon" />
            <span v-else>—</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="类型"
          prop="type"
          width="90">
          <template v-slot="{ row }">
            <el-tag v-if="row.type === 0">{{ row.type_dict }}</el-tag>
            <el-tag type="success" v-else-if="row.type === 1">{{ row.type_dict }}</el-tag>
            <el-tag type="info" v-else-if="row.type === 2">{{ row.type_dict }}</el-tag>
            <el-tag type="warning" v-else-if="row.type === 3">{{ row.type_dict }}</el-tag>
            <el-tag type="danger" v-else-if="row.type === 4">{{ row.type_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="排序"
          prop="sort"
          width="80" />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updated_at"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          prop="type"
          width="80">
          <template v-slot="{ row }">
            <el-button
              v-permission="'enterpriseMenu:update'"
              type="primary"
              link
              @click="editHandle(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Edit ref="refEdit" v-if="visible" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, ref } from 'vue'

import Edit from './components/edit.vue'

import useDictionary from '@/mixins/dictionary'

import { listApi } from '@/api/enterprise-menu'

const { getDictionary } = useDictionary()

const props = {
  children: 'children'
}

const refTable = ref()
const refEdit = ref()
const loading = ref(false)
const visible = ref(false)
const list = ref([])

const getList = () => {
  loading.value = true
  listApi().then(r => {
    if (r) {
      list.value = r.data
    }
    nextTick(() => { loading.value = false })
  })
}

const editHandle = (row) => {
  visible.value = true
  nextTick(() => {
    refEdit.value.init(row)
  })
}

onBeforeMount(() => {
  getDictionary('menu')
  getList()
})
</script>

<style lang="scss" scoped>

</style>
