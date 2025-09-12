<template>
  <div :class="n.b()">
    <el-form inline @keyup.enter="onEnterKeyup">
      <el-form-item>
        <Dict class="w-177_i" v-model="form.status" :code="DICT_CODE_ENUM.NOTICE_TYPE" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="类型" clearable />
      </el-form-item>
      <el-form-item>
        <Dict class="w-177_i" v-model="form.type" :code="DICT_CODE_ENUM.NOTICE_STATUS" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="状态" clearable />
      </el-form-item>
      <el-form-item>
        <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
      </el-form-item>
      <el-form-item>
        <el-button v-repeat @click="onSearch">查询</el-button>
        <el-button v-repeat @click="onReset">重置</el-button>
        <el-button v-repeat type="primary" @click="onRead()">全部已读</el-button>
        <el-button type="danger" @click="onDelete()" :disabled="selection.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="内容" prop="content" show-overflow-tooltip />
      <el-table-column align="center" label="类型" prop="type" width="120">
        <template v-slot="{ row }">
          <el-tag :type="row.type_type">{{ row.type_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="通知时间" prop="createdAt" width="170" />
      <el-table-column align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-if="row.status === NOTICE_STATUS_ENUM.UNREAD" type="primary" link @click="onRead(row.id)">已读</el-button>
            <el-button type="danger" link @click="onDelete(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Pagination class="mv-15" v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
  </div>
</template>

<script setup>
import { Dict, DateRangePicker, Pagination } from '@/components'
import { NOTICE_STATUS_ENUM, DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { clearJson } from '@/common/utils'
import { adminerNoticePageApi, adminerNoticeDeleteApi, adminerNoticeSetStatusApi} from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('notice')

const addEditRef = useTemplateRef('addEditRef')

const loading = ref(false)
const form = reactive({
  type: '',
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

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { ...form, current, size }
  adminerNoticePageApi(params).then(r => {
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
    adminerNoticeDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onRead = async (row) => {
  const ids = row ? [row.id] : []
  // await noticeStore.read(ids)
  getData()
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: notice#{$element-separator};
@include b(notice) {}
</style>
