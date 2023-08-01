<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import { clearJson, havePermission } from '@/utils'

import { pageApi, deleteApi, exportApi, qrcodeApi } from '@/api/wechat-applet'

const refForm = ref()
const refTable = ref()
const refAddEdit = ref()

const loading = ref(false)
const visible = ref(false)
const form = reactive({
  name: '',
  appId: '',
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
 * @description: 新增/编辑弹窗
 * @param {*}
 * @return {*}
 */
const addEditHandle = id => {
  visible.value = true
  nextTick(() => {
    refAddEdit.value.init(id)
  })
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
 * @description: 导出
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const exportHandle = () => {
  exportApi(form)
}

/**
 * @description: 生成二维码
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const qrcodeHandle = (row) => {
  ElMessageBox.confirm(`确定生成小程序名称为[${ row.name }]的二维码?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    qrcodeApi({ key: row.id }).then(r => {
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

const commandHandle = (command, row) => {
  switch (command) {
    case 'qrcode':
      qrcodeHandle(row)
      break
    case 'delete':
      deleteHandle(row.id)
      break
  }
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
onActivated(() => {})
</script>

<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.appId" placeholder="AppId" clearable />
        </el-form-item>
        <el-form-item>
          <DateRangePicker v-model:start="form.start" v-model:end="form.end" />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="resetHandle">重置</el-button>
          <el-button
            v-permission="'wechatApplet:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'wechatApplet:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
          <el-button v-repeat v-permission="'wechatApplet:export'" @click="exportHandle">导出</el-button>
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
          label="ID"
          prop="id"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="名称"
          prop="name"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="原始ID"
          prop="originalId"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="AppID"
          prop="appId"
          show-overflow-tooltip />
        <!--
 <el-table-column
          align="center"
          label="密钥"
          prop="secret"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="消息推送URL"
          prop="pushUrl"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="消息推送Token"
          prop="pushToken"
          show-overflow-tooltip />
        <el-table-column
          align="center"
          label="消息推送密钥"
          prop="pushKey"
          show-overflow-tooltip />
-->
        <el-table-column
          align="center"
          label="二维码"
          prop="qrCode"
          show-overflow-tooltip>
          <template v-slot="{row}">
            <el-image
              v-if="row.qrCode"
              class="height-50 width-50"
              fit="cover"
              :src="row.qrCode"
              preview-teleported
              :preview-src-list="[row.qrCode]" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
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
          v-permission="'wechatApplet:update|wechatApplet:qrcode|wechatApplet:delete'"
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <div class="flex flex_j_c-center">
              <el-button
                v-permission="'wechatApplet:update'"
                type="primary"
                link
                @click="addEditHandle(row.id)">编辑</el-button>
              <el-dropdown
                trigger="click"
                @command="(command) => commandHandle(command, row)"
                v-permission="'wechatApplet:qrcode|wechatApplet:delete'">
                <el-button class="margin_l-12" type="primary" link>更多</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="qrcode" v-if="havePermission('wechatApplet:qrcode')">生成二维码</el-dropdown-item>
                    <el-dropdown-item command="delete" v-if="havePermission('job:delete')">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
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
