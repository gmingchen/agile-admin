<template>
  <Container>
    <template #default>
      <el-table
        :data="list"
        :loading="loading"
        :tree-props="props"
        ref="refTable"
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
            <GIconfont v-if="row.type !== 2 && row.icon" :name="row.icon" />
            <span v-else>—</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="类型"
          prop="type"
          width="90">
          <template v-slot="{ row }">
            <el-tag type="success">
              {{ row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="排序"
          prop="sort"
          width="80" />
      </el-table>
    </template>
  </Container>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import Container from '@/components/container'

import { listApi } from '@/api/enterprise-menu'

export default defineComponent({
  components: { Container },
  setup() {
    const props = {
      children: 'children'
    }

    const refTable = ref()
    const data = reactive({
      loading: false,
      list: []
    })

    const getList = () => {
      listApi().then(r => {
        if (r) {
          data.list = r.data
        }
        nextTick(() => { data.loading = true })
      })
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      props,
      refTable,
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
