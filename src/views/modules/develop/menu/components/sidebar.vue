<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import useModel from '@/hooks/model'
import { MenuType } from '@/utils/enum'
import { UPDATE_MODEL_EVENT } from '@/utils/constant'
import { havePermission, parseData2Tree } from '@/utils'
import { VIRTUAL_ID_KEY } from '../index.js'

import { listApi, deleteApi, dragApi } from '@/api/menu'

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
const index = ref(1)

const getList = () => {
  loading.value = true
  listApi().then(r => {
    if (r) {
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

const addHandle = (row) => {
  const menu = {
    id: `${ VIRTUAL_ID_KEY }${ index.value }`,
    name: `未命名${ index.value }`,
    parentId: 0,
    type: 0
  }
  if (row) {
    menu.parentId = row.id
    if (row.type === 1) {
      menu.type = 2
    }
    if (!row.children) {
      row.children = []
    }
    row.children.push(menu)
  } else {
    list.value.push(menu)
  }
  index.value++
}

const delHandle = (id, arr, number) => {
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
        arr.splice(number, 1)
        if (value.value === id) {
          emits('change')
        }
      }
    })
  }).catch(() => {
    // to do something on canceled
  })
}

const deleteHandle = (node, row) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const number = children.findIndex((item) => item.id === row.id)
  if ((row.id + '').includes(VIRTUAL_ID_KEY)) {
    children.splice(number, 1)
    if (value.value === row.id) {
      emits('change')
    }
  } else {
    delHandle(row.id, children, number)
  }
}

const clickHandle = (row, node) => {
  value.value = row.id
  emits('change', { row, parentType: node.parent.data.type || 0 })
}

const allowDragHandle = (node) => {
  if ((node.data.id + '').includes(VIRTUAL_ID_KEY)) {
    return false
  }
  return true
}

const allowDropHandle = (dragNode, dropNode, type) => {
  let result = true
  const dragData = dragNode.data
  const dropData = dropNode.data
  let dropParentType
  switch (type) {
    case 'inner':
      dropParentType = dropData.type
      break
    case 'prev':
    case 'next':
      dropParentType = dropNode.parent.data.type || 0
      break
  }
  switch (dragData.type) {
    case MenuType.CATALOG:
      if (dropParentType !== MenuType.CATALOG) {
        result = false
      }
      break
    case MenuType.MENU:
      if (dropParentType !== MenuType.CATALOG) {
        result = false
      }
      break
    case MenuType.BUTTON:
      if (dropParentType !== MenuType.MENU) {
        result = false
      }
      break
    case MenuType.IFRAME:
      if (dropParentType !== MenuType.CATALOG) {
        result = false
      }
      break
    case MenuType.URL:
      if (dropParentType !== MenuType.CATALOG) {
        result = false
      }
      break
  }
  return result
}

const nodeDropHandle = (dragNode, dropNode, position) => {
  const dragData = dragNode.data
  const dropData = dropNode.data
  const dropParentData = dropNode.parent.data
  let dropParentId
  let dropChildren
  switch (position) {
    case 'inner':
      dropParentId = dropData.id
      dropChildren = dropData.children
      break
    case 'before':
    case 'after':
      dropParentId = dropParentData.id || 0
      dropChildren = dropParentData.children || dropParentData
      break
  }
  const params = {
    id: dragData.id,
    parentId: dropParentId,
    sortIds: dropChildren.map(item => item.id)
  }
  dragApi(params).then(r => {
    if (r) {
      ElMessage({
        message: '操作成功!',
        type: 'success'
      })
    } else {
      getList()
    }
  })
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
  <div class="sidebar-container height-full width-300 flex flex_d-column">
    <div class="margin_b-10 flex">
      <el-input class="margin_r-10" v-model="form.name" @input="inputHandle">
        <template #suffix>
          <Iconfont name="search" />
        </template>
      </el-input>
      <el-button v-repeat @click="getList()">
        <iconfont name="refresh" />
      </el-button>
      <el-button v-permission="'menu:create'" type="primary" @click="addHandle()">
        <iconfont name="plus" />
      </el-button>
    </div>
    <el-scrollbar class="flex-item_f-1" v-loading="loading">
      <el-tree
        ref="refTree"
        :data="list"
        :props="treeProps"
        node-key="id"
        :expand-on-click-node="true"
        :filter-node-method="filterNodeHandle"
        @node-click="clickHandle"
        highlight-current
        :draggable="havePermission('menu:drag')"
        :allow-drag="allowDragHandle"
        :allow-drop="allowDropHandle"
        @node-drop="nodeDropHandle">
        <template #default="{node, data}">
          <div class="node-box font-size-14 flex-item_f-1 flex flex_j_c-space-between flex_a_i-center">
            <div class="node-label flex-item_f-1 margin_r-10 ellipse">{{ data.name }}</div>
            <div class="node-button-box">
              <el-button
                v-permission="'menu:create'"
                size="small"
                v-if="data.type !== 2 && data.type !== 3 && data.type !== 4"
                @click.stop="addHandle(data)">
                <Iconfont name="plus" size="12px" />
              </el-button>
              <el-button
                v-permission="'menu:delete'"
                size="small"
                v-if="!data.children"
                @click.stop="deleteHandle(node, data)">
                <Iconfont name="delete" size="12px" />
              </el-button>
              <el-tag :type="data.type_type" v-show="data.type_dict">{{ data.type_dict }}</el-tag>
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
  &:hover {
    .node-button-box .el-button {
      visibility: visible;
    }
  }
}
.node-box {
  width: 0;
  font-size: 14px;
  .node-button-box {
    .el-button {
      visibility: hidden;
    }
    .el-button + .el-button {
      margin-left: 5px;
    }
    .el-tag {
      margin-left: 5px;
    }
  }
}
</style>
