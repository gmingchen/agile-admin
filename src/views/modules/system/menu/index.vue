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
            <el-tag v-if="row.type === 0">目录</el-tag>
            <el-tag type="success" v-else-if="row.type === 1">菜单</el-tag>
            <el-tag type="info" v-else-if="row.type === 2">按钮</el-tag>
            <el-tag type="warning" v-else-if="row.type === 3">iframe</el-tag>
            <el-tag type="danger" v-else-if="row.type === 4">外链</el-tag>
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
              v-permission="'backstage:enterprise:menu:update'"
              type="text"
              @click="editHandle(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Edit ref="refEdit" v-if="visible" />
    </template>
  </Container>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import Edit from './components/edit'

import { listApi } from '@/api/enterprise-menu'

export default defineComponent({
  components: { Edit },
  setup() {
    const props = {
      children: 'children'
    }

    const refTable = ref()
    const refEdit = ref()
    const data = reactive({
      loading: false,
      visible: false,
      list: []
    })

    const getList = () => {
      data.loading = true
      listApi().then(r => {
        if (r) {
          data.list = r.data
        }
        nextTick(() => { data.loading = false })
      })
    }

    const editHandle = (row) => {
      data.visible = true
      nextTick(() => {
        refEdit.value.init(row)
      })
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      props,
      refTable,
      refEdit,
      ...toRefs(data),
      editHandle
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
