<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import useModel from '@/hooks/model'
import { UPDATE_MODEL_EVENT } from '@/utils/constant'
import { parseData2Tree } from '@/utils'

import { selectApi } from '@/api/dept'

const emits = defineEmits(['change', UPDATE_MODEL_EVENT])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  }
})

const value = useModel(props)

const treeProps = {
  children: 'children',
  label: 'name'
}
const refTree = ref()
const loading = ref(false)
const form = reactive({
  name: ''
})
const list = ref([])

const getList = () => {
  loading.value = true
  selectApi().then(r => {
    if (r) {
      r.data.unshift({
        id: '',
        name: '全部管理员'
      })
      list.value = parseData2Tree(r.data)
    }
    nextTick(() => {
      loading.value = false
      if (refTree.value) {
        refTree.value.filter(form.name)
      }
    })
  })
}

const clickHandle = (row) => {
  value.value = row.id
  emits('change', row)
}

const filterNodeHandle = (keyword, row) => {
  if (!keyword) return true
  return row.name.includes(keyword)
}

const inputHandle = () => {
  refTree.value.filter(form.name)
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <div class="sidebar-container height-full width-300 flex flex_d-column" v-drag-resize>
    <div class="padding-10 flex">
      <el-input class="margin_r-10" v-model="form.name" @input="inputHandle">
        <template #suffix>
          <Iconfont name="search" />
        </template>
      </el-input>
      <el-button v-repeat @click="getList()">
        <iconfont name="refresh" />
      </el-button>
    </div>
    <el-scrollbar class="flex-item_f-1" v-loading="loading">
      <el-tree
        class="padding-n-10"
        ref="refTree"
        :data="list"
        :props="treeProps"
        :current-node-key="value"
        node-key="id"
        :expand-on-click-node="true"
        :filter-node-method="filterNodeHandle"
        @node-click="clickHandle"
        highlight-current>
        <template #default="{node, data}">
          <div class="node-box font-size-14 flex-item_f-1 flex flex_j_c-space-between flex_a_i-center">
            <div class="node-label flex-item_f-1 margin_r-10 ellipse">{{ data.name }}</div>
            <div>
              <el-tag :type="data.status_type" v-show="data.status_dict">{{ data.status_dict }}</el-tag>
            </div>
          </div>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.el-tree-node__content) {
  height: 36px;
}
.node-box {
  width: 0;
}
</style>
