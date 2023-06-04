<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import { clearJson, formatStorageUnit } from '@/utils'
import { AUTH_KEY, SUCCESS_CODE } from '@/utils/constant'

import { pageApi, deleteApi, uploadUrlApi } from '@/api/file'

const authStore = useAuthStore()
const { token } = authStore

const refForm = ref()
const refTable = ref()

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
const visible = ref(false)
const previewList = ref([])

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
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
 * @author: gumingchen
 */
const reacquireHandle = () => {
  page.current = 1
  getList()
}
/**
 * @description: 重置并重新获取数据
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const resetHandle = () => {
  clearJson(form)
  reacquireHandle()
}

/**
 * @description: 删除
 * @param {number} id
 * @return {*}
 * @author: gumingchen
 */
const deleteHandle = id => {
  ElMessageBox.confirm(`确定对[id=${ id }]进行[删除]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteApi({ key: id }).then(r => {
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
 * 预览事件
 * @param {*} row
 */
const previewHandle = row => {
  previewList.value = [row.url]
  visible.value = true
}
/**
 * 关闭预览事件
 */
const previewCloseHandle = () => {
  previewList.value = []
  visible.value = false
}

/**
* @description: 上传文件成功回调
* @param {number} id
* @return {*}
* @author: gumingchen
*/
const successHandle = (r) => {
  if (SUCCESS_CODE.includes(r.code)) {
    getList()
  } else {
    ElMessage({
      message: r.message,
      type: 'warning'
    })
  }
}

/**
 * 判断类型是否是图片
 * @param {*} type
 */
const isImage = (type) => {
  const reg = /^image\/[a-zA-Z]+$/
  return reg.test(type)
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-upload
            class="flex-box margin_l-12"
            :action="uploadUrlApi()"
            :headers="{
              [AUTH_KEY]: token
            }"
            :show-file-list="false"
            :on-success="successHandle">
            <el-button type="primary">上传文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        border>
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="原始名称"
          prop="original"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="实际名称"
          prop="actual"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="物理路径"
          prop="path"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="虚拟路径"
          prop="url"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="类型"
          prop="type"
          width="120" />
        <el-table-column
          align="center"
          label="大小"
          prop="size"
          width="120">
          <template v-slot="{ row }">
            {{ formatStorageUnit(row.size) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="上传时间"
          prop="createdAt"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-show="isImage(row.type)"
              type="primary"
              link
              @click="previewHandle(row)">预览</el-button>
            <el-button
              v-permission="'fileConfig:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-image-viewer
        v-if="visible"
        :url-list="previewList"
        @close="previewCloseHandle"
        hide-on-click-modal
        teleported />
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
