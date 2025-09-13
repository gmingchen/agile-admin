<template>
  <Container :class="n.b()">
    <template #headbar>
      <el-form inline @keyup.enter="onEnterKeyup">
        <el-form-item>
          <el-input v-model="form.templateTitle" placeholder="标题" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.fromMail" placeholder="发送邮箱" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.toMail" placeholder="接收邮箱" clearable />
        </el-form-item>
        <el-form-item>
          <Dict class="w-177_i" v-model="form.status" :code="DICT_CODE_ENUM.STATUS" :type="DICT_COMPONENT_TYPE_ENUM.SELECT" placeholder="状态" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="onSearch">查询</el-button>
          <el-button v-repeat @click="onReset">重置</el-button>
          <el-button v-permission="'mail:send'" type="primary" @click="onSend()">发送邮件</el-button>
          <el-button v-permission="'mail:delete'" type="danger" :disabled="!selection.length" @click="onDelete()">批量删除</el-button>
          <el-button v-permission="'mail:export'" v-repeat @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="发送邮箱" prop="fromMail" show-overflow-tooltip />
      <el-table-column align="center" label="接收邮箱" prop="fromMail" show-overflow-tooltip>
        <template v-slot="{ row }">
          {{ row.toMail.join(',') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="模版编码" prop="templateCode" show-overflow-tooltip />
      <el-table-column align="center" label="模版标题" prop="templateTitle" show-overflow-tooltip />
      <el-table-column align="center" label="状态" prop="status" width="100">
        <template v-slot="{ row }">
          <el-tag :type="row.status_type">{{ row.status_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发送时间" prop="createdAt" width="170" />
      <el-table-column v-permission="'mail:info|mail:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'mail:info'" type="primary" link @click="onDetails(row.id)">详情</el-button>
            <el-button v-permission="'mail:delete'" type="danger" link @click="onDelete(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
    <Send ref="sendRef" @confirm="getData" />
    <Details ref="detailsRef" />
  </Container>
</template>

<script setup>
import { Container, Dict, DateRangePicker, Pagination } from '@/components'
import Send from './components/send/index.vue'
import Details from './components/details/index.vue'
import { useNamespace } from '@/hooks'
import { DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { clearJson, download } from '@/common/utils'
import { mailPageApi, mailDeleteApi, mailExportApi} from '@/apis'

const n = useNamespace('mail')

const sendRef = useTemplateRef('sendRef')
const detailsRef = useTemplateRef('detailsRef')

const loading = ref(false)
const form = reactive({
  templateTitle: '',
  fromMail: '',
  toMail: '',
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
  mailPageApi(params).then(r => {
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
    mailDeleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}

const onExport = () => {
  mailExportApi({ ...form }).then(r => r && download(r.data, '', 'xlsx', r.type))
}

const onSend = () => {
  sendRef.value.open()
}

const onDetails = (id) => {
  detailsRef.value.open(id)
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: mail#{$element-separator};
@include b(mail) {}
</style>
