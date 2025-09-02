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
          <el-button v-permission="'job:create'" type="primary" @click="onAddOrEdit()">新增</el-button>
          <el-button v-permission="'job:run'" type="success" :disabled="!selection.length" @click="onRun()">批量执行</el-button>
          <el-button v-permission="'job:resume'" type="success" :disabled="!selection.length" @click="onResume()">批量恢复</el-button>
          <el-button v-permission="'job:pause'" type="success" :disabled="!selection.length" @click="onPause()">批量暂停</el-button>
          <el-button v-permission="'job:delete'" type="danger" :disabled="!selection.length" @click="onDelete()">批量删除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="loading" :data="list" border @selection-change="onSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="ID" prop="id" width="80" />
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="处理器名称" prop="bean" />
      <el-table-column align="center" label="cron表达式" prop="cron" />
      <el-table-column align="center" label="参数" prop="params" />
      <el-table-column align="center" label="备注" prop="remark" />
      <el-table-column align="center" label="状态" prop="status_dict">
        <template v-slot="{row}">
          <el-tag :type="row.status_type">{{ row.status_dict }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" min-width="170" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" min-width="170" />
      <el-table-column v-permission="'job:update|job:delete'" align="center" label="操作" width="110" fixed="right">
        <template v-slot="{ row }">
          <div class="f_jc-center">
            <el-button v-permission="'job:update'" type="primary" link @click="onAddOrEdit(row.id)">编辑</el-button>
            <el-dropdown
              trigger="click"
              @command="(command) => onCommand(command, row.id)"
              v-permission="'job:run|job:resume|job:paush|job:delete'">
              <el-button class="margin_l-12" type="primary" link>更多</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="run" v-if="hasPermission('job:run')">执行</el-dropdown-item>
                  <el-dropdown-item command="resume" v-if="hasPermission('job:resume')" :disabled="row.status === STATUS_ENUM.ENABLE">恢复</el-dropdown-item>
                  <el-dropdown-item command="pause" v-if="hasPermission('job:pause')" :disabled="row.status === STATUS_ENUM.DISABLE">暂停</el-dropdown-item>
                  <el-dropdown-item command="delete" v-if="hasPermission('job:delete')">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footbar>
      <Pagination v-model:current="page.current" v-model:size="page.size" :total="page.total" :disabled="loading" @change="onPaginationChange" />
    </template>
    <AddEdit ref="addEditRef" @confirm="getData" />
  </Container>
</template>

<script setup>
import { Container, DateRangePicker, Pagination } from '@/components'
import AddEdit  from './components/add-edit/index.vue'
import { useNamespace } from '@/hooks'
import { hasPermission } from '@/permission'
import { STATUS_ENUM } from '@/common/enums'
import { clearJson } from '@/common/utils'
import { jobPageApi, jobDeleteApi, jobRunApi, jobResumeApi, jobPauseApi } from '@/apis'

const n = useNamespace('job')

const addEditRef = useTemplateRef('addEditRef')

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

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = { ...form, current, size }
  jobPageApi(params).then(r => {
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

const handle = (id, operate, api) => {
  const ids = id ? [id] : selection.value.map(item => item.id)

  ElMessageBox.confirm(
    `确定对[id=${ ids.join(',') }]进行[${ id ? operate : `批量${ operate }` }]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    api({ keys: ids }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
      }
    })
  }).catch(() => {})
}


const onRun = (id) => handle(id, '执行', jobRunApi)
const onResume = (id) => handle(id, '恢复', jobResumeApi)
const onPause = (id) => handle(id, '暂停', jobPauseApi)
const onDelete = (id) => handle(id, '删除', jobDeleteApi)

const onCommand = (command, id) => {
  if (command === 'run') {
    onRun(id)
  } else if (command === 'resume') {
    onResume(id)
  } else if (command === 'pause') {
    onPause(id)
  } else if (command === 'delete') {
    onDelete(id)
  }
}

const onAddOrEdit = (id) => {
  addEditRef.value.open(id)
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: job#{$element-separator};
@include b(job) {}
</style>
