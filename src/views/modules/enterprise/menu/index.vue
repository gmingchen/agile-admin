<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <EnterpriseSidebar v-model="active" @change="changeHandle" />
    </template>
    <template #header v-if="havePermission('global:enterpriseMenu:modify')">
      <el-form ref="refForm" :inline="true">
        <el-form-item>
          <el-button
            v-permission="'global:enterpriseMenu:modify'"
            type="primary"
            @click="modifyHandle()"
            :disabled="!active">修改权限菜单</el-button>
        </el-form-item>
      </el-form>
    </template>
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
            <el-tag v-if="row.type === 0">{{ row.type_dict }}</el-tag>
            <el-tag type="success" v-else-if="row.type === 1">{{ row.type_dict }}</el-tag>
            <el-tag type="info" v-else-if="row.type === 2">{{ row.type_dict }}</el-tag>
            <el-tag type="warning" v-else-if="row.type === 3">{{ row.type_dict }}</el-tag>
            <el-tag type="danger" v-else-if="row.type === 4">{{ row.type_dict }}</el-tag>
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
          width="110">
          <template v-slot="{ row }">
            <el-button
              v-permission="'global:enterpriseMenu:update'"
              type="primary"
              link
              @click="editHandle(row)">编辑</el-button>
            <el-button
              v-if="!row.children"
              v-permission="'global:enterpriseMenu:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Modify ref="refModify" v-if="modifyVisible" @refresh="getList" />
      <Edit ref="refEdit" v-if="editVisible" />
    </template>
  </ContainerSidebar>
</template>

<script setup>
import { reactive, ref, nextTick, onBeforeMount } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import ContainerSidebar from '@/components/container-sidebar/index.vue'
import EnterpriseSidebar from '@/components/enterprise-sidebar/index.vue'
import Modify from './components/modify.vue'
import Edit from './components/edit.vue'

import useDictionary from '@/mixins/dictionary'
import { clearJson, havePermission } from '@/utils'

import { globalListApi, globalDeleteApi } from '@/api/enterprise-menu'

const { getDictionary } = useDictionary()

const props = {
  children: 'children'
}
const refContainerSidebar = ref()
const refForm = ref()
const refTable = ref()
const refModify = ref()
const refEdit = ref()
const active = ref('')
const loading = ref(false)
const modifyVisible = ref(false)
const editVisible = ref(false)
const form = reactive({
  name: '',
  date: []
})
const list = ref([])

const getList = () => {
  if (active.value) {
    loading.value = true
    globalListApi(active.value).then(r => {
      if (r) {
        list.value = r.data
      }
      nextTick(() => { loading.value = false })
    })
  }
}

const modifyHandle = () => {
  modifyVisible.value = true
  nextTick(() => {
    refModify.value.init(active.value)
  })
}

const editHandle = (row) => {
  editVisible.value = true
  nextTick(() => {
    refEdit.value.init(row)
  })
}

const deleteHandle = (id) => {
  ElMessageBox.confirm(`确定对[id=${ id }]进行[删除]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    globalDeleteApi(id).then(r => {
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

const changeHandle = (_row) => {
  refContainerSidebar.value.setScrollTop()
  getList()
}

onBeforeMount(() => {
  getDictionary('menu')
})
</script>

<style lang="scss" scoped>

</style>
