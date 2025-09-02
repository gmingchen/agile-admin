<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <Upload @success="onUploadSuccess">
            <el-button type="primary">上传</el-button>
          </Upload>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="原始名称" prop="original" show-overflow-tooltip />
      <el-table-column align="center" label="实际名称" prop="actual" show-overflow-tooltip />
      <el-table-column align="center" label="物理路径" prop="path" show-overflow-tooltip />
      <el-table-column align="center" label="虚拟路径" prop="url" show-overflow-tooltip />
      <el-table-column align="center" label="类型" prop="type" width="120" />
      <el-table-column align="center" label="大小" prop="size" width="120">
        <template v-slot="{ row }">
          {{ formatStorageUnit(row.size) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间" prop="createdAt" min-width="170" />
      <el-table-column v-permission="'file:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-if="isImage(row.type)" type="primary" link @click="onPreview(row)">预览</el-button>
            <el-button v-permission="'file:delete'" type="danger" link @click="onDelete(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
    <el-image-viewer
      v-if="visible"
      :url-list="previewList"
      hide-on-click-modal
      teleported
      @close="visible = false" />
  </Container>
</template>

<script setup>
import { Container, DateRangePicker, Upload, Pagination } from '@/components'
import { useNamespace } from '@/hooks';
import { clearJson, formatStorageUnit } from '@/common/utils'
import { filePageApi, fileDeleteApi } from '@/apis'

const n = useNamespace('file-list')

const loading = ref(false)
const form = reactive({
  name: '',
  status: '',
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
const visible = ref(false)
const previewList = ref([])

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { ...form, current, size }
  filePageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => loading.value = false)
  })
}

const handleReacquire = () => {
  page.current = 1
  getData()
}

const isImage = (type) => {
  const reg = /^image\/[a-zA-Z]+$/
  return reg.test(type)
}

const onSearch = () => {
  handleReacquire()
}

const onReset = () => {
  clearJson(form)
  handleReacquire()
}

const onEnterKeyup = () => {
  handleReacquire()
}

const onPaginationChange = () => {
  getData()
}

const onSelectionChange = value => {
  selection.value = value
}

const onDelete = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(
    `确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    fileDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onPreview = (row) => {
  previewList.value = [row.url]
  visible.value = true
}

const onUploadSuccess = () => {
  getData()
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(file-list) {}
</style>
