<template>
  <div :class="n.b()" v-drag-resize>
    <div class="p-10 f_ai-center">
      <el-input class="mr-10" v-model="keyword" :disabled="loading" @input="onInput">
        <template #suffix>
          <Icon name="search" />
        </template>
      </el-input>
      <el-button v-repeat :disabled="loading" @click="getData()">
        <Icon name="refresh" />
      </el-button>
    </div>
    <el-scrollbar class="f_f-1" v-loading="loading">
      <el-tree
        class="ph-10"
        ref="treeRef"
        node-key="id"
        highlight-current
        :data="list"
        :current-node-key="value"
        :props="treeProps"
        :expand-on-click-node="true"
        :filter-node-method="filterNodeMethod"
        @node-click="onNodeClick">
          <template #default="{node, data}">
            <div :class="n.e('node-wrap')">
              <div :class="[n.e('node-label'), 'e']">{{ data.name }}</div>
              <div>
                <el-tag :type="data.status_type" v-show="data.status_dict">{{ data.status_dict }}</el-tag>
              </div>
            </div>
          </template>
        </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { parseDataToTree } from '@/common/utils'
import { deptSelectListApi } from '@/apis'
import { useNamespace, useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks'

const n = useNamespace('sidebar')

const emits = defineEmits([UPDATE_MODEL_EVENT, 'change'])
const props = defineProps({
  [MODEL_NAME]: {
    type: [String, Number],
    required: true
  },
})
const value = useModel(props)

const treeRef = useTemplateRef('treeRef')
const treeProps = { label: 'name', children: 'children', }

const loading= ref(false)
const keyword = ref('')
const list = ref([])

const getData = () => {
  loading.value = true
  deptSelectListApi().then(r => {
    if (r) {
      r.data.unshift({ id: '', name: '全部管理员' })
      list.value = parseDataToTree(r.data)
    }
    nextTick(() => {
      loading.value = false
      treeRef.value.filter(keyword.value)
    })
  })
}

const filterNodeMethod = (keyword, row) => {
  if (!keyword) return true
  return row.name.includes(keyword)
}

const onNodeClick = (row) => {
  value.value = row.id
  emits('change', row)
}

const onInput = () => treeRef.value.filter(keyword.value)

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: sidebar#{$element-separator};
@include b(sidebar) {
  @include e(node-wrap) {
    width: 0;
    flex: 1;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ::v-deep(.el-tree-node__content) {
    height: 36px;
  }
}
</style>
