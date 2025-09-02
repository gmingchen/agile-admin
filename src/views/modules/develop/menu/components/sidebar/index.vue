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
      <el-button v-permission="'menu:create'" type="primary" @click="onAdd()">
        <Icon name="plus" />
      </el-button>
    </div>
    <el-scrollbar class="f_f-1" v-loading="loading">
      <el-tree
        class="ph-10"
        ref="treeRef"
        node-key="id"
        highlight-current
        :data="list"
        :props="treeProps"
        :expand-on-click-node="true"
        :filter-node-method="filterNodeMethod"
        :draggable="hasPermission('menu:drag')"
        :allow-drag="allowDrag"
        :allow-drop="allowDrop"
        @node-click="onNodeClick"
        @node-drop="onNodeDrop">
        <template #default="{node, data}">
          <div :class="n.e('node-wrap')">
            <div :class="[n.e('node-label'), 'e']">{{ data.name }}</div>
            <div :class="n.e('node-operate')">
              <el-button
                v-permission="'menu:create'"
                size="small"
                v-if="data.type !== PERMISSION_TYPE_ENUM.BUTTON && data.type !== PERMISSION_TYPE_ENUM.IFRAME && data.type !== PERMISSION_TYPE_ENUM.URL"
                @click.stop="onAdd(data)">
                <Icon name="plus" size="12px" />
              </el-button>
              <el-button
                v-permission="'menu:delete'"
                size="small"
                v-if="!data.children"
                @click.stop="onDelete(node, data)">
                <Icon name="delete" size="12px" />
              </el-button>
              <el-tag class="ml-5" :type="data.type_type" v-show="data.type_dict">{{ data.type_dict }}</el-tag>
            </div>
          </div>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { Icon } from '@/components'
import { hasPermission } from '@/permission'
import { PERMISSION_TYPE_ENUM } from '@/common/enums'
import { parseDataToTree } from '@/common/utils'
import { VIRTUAL_ID_KEY } from '../../config.js'
import { permissionListApi, permissionDragApi, permissionDeleteApi } from '@/apis'
import { useNamespace, useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks';

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
const index = ref(1)

const getData = () => {
  loading.value = true
  permissionListApi().then(r => {
    if (r) {
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

const allowDrag = (node) => !(node.data.id + '').includes(VIRTUAL_ID_KEY)

const allowDrop = (dragNode, dropNode, type) => {
  const dragData = dragNode.data
  const dropData = dropNode.data
  let dropParentType = type === 'inner' ? dropData.type : dropNode.parent.data.type || PERMISSION_TYPE_ENUM.CATALOG

  if (
    dragData.type === PERMISSION_TYPE_ENUM.CATALOG ||
    dragData.type === PERMISSION_TYPE_ENUM.GROUP ||
    dragData.type === PERMISSION_TYPE_ENUM.IFRAME ||
    dragData.type === PERMISSION_TYPE_ENUM.URL
  ) {
    return dropParentType === PERMISSION_TYPE_ENUM.CATALOG || dropParentType === PERMISSION_TYPE_ENUM.GROUP
  } else if (
    dragData.type === PERMISSION_TYPE_ENUM.ROUTER ||
    dragData.type === PERMISSION_TYPE_ENUM.MENU
  ) {
    return dropParentType === PERMISSION_TYPE_ENUM.CATALOG || dropParentType === PERMISSION_TYPE_ENUM.GROUP || dropParentType === PERMISSION_TYPE_ENUM.ROUTER
  } else if (dragData.type === PERMISSION_TYPE_ENUM.BUTTON) {
    return dropParentType === PERMISSION_TYPE_ENUM.MENU
  } else {
    return true
  }
}

const onNodeClick = (row, node) => {
  value.value = row.id
  emits('change', { row, parentType: node.parent.data.type || PERMISSION_TYPE_ENUM.CATALOG })
}

const onNodeDrop = (dragNode, dropNode, position) => {
  const dragData = dragNode.data
  const dropData = dropNode.data
  const dropParentData = dropNode.parent.data
  let dropParentId = position === 'inner' ? dropData.id : dropParentData.id || 0
  let dropChildren = position === 'inner' ? dropData.children : dropParentData.children || dropParentData
  const params = {
    id: dragData.id,
    parentId: dropParentId,
    sortIds: dropChildren.map(item => item.id)
  }
  permissionDragApi(params).then(r => {
    if (r) {
      ElMessage.success('操作成功!')
    } else {
      getData()
    }
  })
}

const onInput = () => treeRef.value.filter(keyword.value)

const onAdd = (row) => {
  const permission = {
    id: `${ VIRTUAL_ID_KEY }${ index.value }`,
    name: `未命名${ index.value }`,
    parentId: 0,
    type: PERMISSION_TYPE_ENUM.CATALOG
  }
  if (row) {
    permission.parentId = row.id
    if (row.type === PERMISSION_TYPE_ENUM.MENU) {
      permission.type = PERMISSION_TYPE_ENUM.BUTTON
    } else if (row.type === PERMISSION_TYPE_ENUM.ROUTER) {
      permission.type = PERMISSION_TYPE_ENUM.ROUTER
    }
    if (!row.children) {
      row.children = []
    }
    row.children.push(permission)
  } else {
    list.value.push(permission)
  }
  index.value++
}

const onDelete = (node, row) => {
  const { data } = node.parent
  const children = data.children || data
  const number = children.findIndex((item) => item.id === row.id)
  if ((row.id + '').includes(VIRTUAL_ID_KEY)) {
    children.splice(number, 1)
    if (value.value === row.id) {
      emits('change')
    }
  } else {
    ElMessageBox.confirm(
      `确定对[id=${ row.id }]进行[删除]操作?`,
      { title: '提示', confirmButtonText: '确认', type: 'warning' }
    ).then(() => {
        permissionDeleteApi({ key: row.id }).then(r => {
          if (r) {
            ElMessage.success('操作成功!')
            children.splice(number, 1)
            if (value.value === row.id) {
              emits('change')
            }
          }
        })
      }).catch(() => {
        // to do something on canceled
      })
  }
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: sidebar#{$element-separator};
@include b(sidebar) {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;

  @include e(node-wrap) {
    width: 0;
    flex: 1,;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @include e(node-label) {
    margin-right: 10px;
    flex: 1;
  }
  @include e(node-operate) {
    .el-button {
      visibility: hidden;
      & + .el-button {
        margin-left: 5px;
      }
    }
  }
  ::v-deep(.el-tree-node__content) {
    height: 36px;
    &:hover {
      .#{$prefix}node-operate .el-button {
        visibility: visible;
      }
    }
  }
}
</style>
