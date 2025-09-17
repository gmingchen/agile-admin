<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline>
        <el-form-item>
          <el-button v-permission="'region:create'" type="primary" @click="onAddOrEdit()">新增</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" :load="onLoad" :tree-props="props" row-key="id" lazy border>
      <el-table-column align="left" label="ID" prop="id" width="130" />
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="区域编码" prop="code" />
      <el-table-column align="center" label="等级" prop="level" width="80">
        <template v-slot="{ row }">
          <el-tag :type="row.level_type">{{ row.level_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" width="170" />
      <el-table-column v-permission="'region:update|region:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'region:update'" type="primary" link @click="onAddOrEdit(row.id)">编辑</el-button>
            <el-button v-permission="'region:delete'" type="danger" link @click="onDelete(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <AddEdit ref="addEditRef" @confirm="getData" />
  </Container>
</template>

<script setup>
import { Container } from '@/components'
import AddEdit from './components/add-edit/index.vue'
import { useNamespace } from '@/hooks'
import { regionListApi, regionDeleteApi } from '@/apis'

const n = useNamespace('region')

const addEditRef = useTemplateRef('addEditRef')

const props = { children: 'children', hasChildren: 'hasChildren' }

const loading = ref(false)
const list = ref([])

const getData = async (parentId = 0) => {
  try {
    const r = await regionListApi({ parentId })
    if (r) {
      r.data.forEach(item => {
        if (item.level < 3) {
          item.hasChildren = true
        }
      })
      return r.data
    }
    return []
  } catch (error) {
    return []
  }
}

const handleReacquire = async () => {
  loading.value = true
  list.value = []
  list.value = await getData()
  nextTick(() => loading.value = false)
}

const onLoad = async (row, _treeNode, resolve) => {
  const r = await getData(row.id)
  resolve(r)
}

const onDelete = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(
    `确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    regionDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        handleReacquire()
      }
    })
  }).catch(() => {})
}

const onAddOrEdit = (id) => {
  addEditRef.value.open(id)
}

onBeforeMount(handleReacquire)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: region#{$element-separator};
@include b(region) {}
</style>
