<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import Integral from './components/integral.vue'

import { clearJson } from '@/utils'
import { Status } from '@/utils/enum'

import { pageApi, deleteApi, setStatusApi, exportApi } from '@/api/user'

const router = useRouter()

const refForm = ref()
const refTable = ref()
const refIntegral = ref()

const loading = ref(false)
const visible = ref(false)
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

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*}
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
 */
const reacquireHandle = () => {
  page.current = 1
  getList()
}
/**
 * @description: 重置并重新获取数据
 * @param {*}
 * @return {*}
 */
const resetHandle = () => {
  clearJson(form)
  reacquireHandle()
}

/**
 * @description: 删除
 * @param {number} id
 * @return {*}
 */
const deleteHandle = id => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        getList()
      }
    })
  }).catch(() => {
    // to do something on canceled
  })
}

/**
 * 状态变化之前操作
 * @param {*} row
 */
const statusBefore = row => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(`确定对[id=${ row.id }]进行[${ row.status === Status.ENABLE ? '禁用' : '启用' }]操作`, '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}
/**
 * @description: 状态
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const statusHandle = row => {
  const params = {
    key: row.id,
    value: row.status
  }
  setStatusApi(params).then(r => {
    if (r) {
      ElMessage({
        message: '操作成功!',
        type: 'success'
      })
    } else {
      row.status = row.status === Status.DISABLE ? Status.ENABLE : Status.DISABLE
    }
  })
}

/**
 * @description: 跳转详情页
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const detailsHandle = row => {
  router.push({
    name: 'user-details',
    query: { id: row.id, custom: row.nickname },
    params: { },
    meta: { label: row.nickname }
  })
}

/**
 * @description: 积分弹窗
 * @param {*}
 * @return {*}
 */
const integralHandle = row => {
  visible.value = true
  nextTick(() => {
    refIntegral.value.init(row)
  })
}

/**
 * @description: 导出
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const exportHandle = () => {
  exportApi(form)
}

/**
 * @description: table多选事件
 * @param {*} val
 * @return {*}
 * @author: 拖孩
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
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.nickname" placeholder="昵称" clearable />
        </el-form-item>
        <el-form-item>
          <DictSelect v-model="form.status" code="STATUS" placeholder="状态" />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button
            v-permission="'user:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
          <el-button v-repeat v-permission="'user:export'" @click="exportHandle">导出</el-button>
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
          label="头像"
          prop="avatar"
          width="80">
          <template v-slot="{row}">
            <el-image
              v-if="row.avatar"
              class="height-50 width-50"
              fit="cover"
              :src="row.avatar"
              preview-teleported
              :preview-src-list="[row.avatar]" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="昵称"
          prop="nickname"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="手机号"
          prop="mobile"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="邮箱"
          prop="email"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="生日"
          prop="birthday"
          width="160" />
        <el-table-column
          align="center"
          label="性别"
          prop="sex"
          width="80">
          <template v-slot="{ row }">
            <el-tag :type="row.sex_type">{{ row.sex_dict }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="收款码"
          prop="payable"
          width="80">
          <template v-slot="{row}">
            <el-image
              v-if="row.payable"
              class="height-50 width-50"
              fit="cover"
              :src="row.payable"
              preview-teleported
              :preview-src-list="[row.payable]" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="80"
          show-overflow-tooltip>
          <template v-slot="{ row }">
            <el-switch
              v-permission="'user:status'"
              :before-change="statusBefore.bind(this, row)"
              @change="statusHandle(row)"
              v-model="row.status"
              :active-value="Status.ENABLE"
              :inactive-value="Status.DISABLE" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="注册时间"
          prop="createdAt"
          width="160"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updatedAt"
          width="160"
          show-overflow-tooltip />
        <el-table-column
          v-permission="'user:info|integral:create|user:delete'"
          align="center"
          label="操作"
          width="180"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'user:info'"
              type="primary"
              link
              @click="detailsHandle(row)">详情</el-button>
            <el-button
              v-permission="'integral:create'"
              type="primary"
              link
              @click="integralHandle(row)">积分奖惩</el-button>
            <el-button
              v-permission="'user:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Integral ref="refIntegral" v-if="visible" />
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
