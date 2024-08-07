<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './add-edit.vue'

import useModel from '@/hooks/model'
import { UPDATE_MODEL_EVENT } from '@constants'
import { havePermission } from '@utils'

import { listApi, deleteApi } from '@/api/dict'

const emits = defineEmits(['change', UPDATE_MODEL_EVENT])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  }
})

const value = useModel(props)

const refAddEdit = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  keyword: ''
})
const allList = ref([])

const list = computed(() => {
  const result = allList.value.filter(item => {
    if (!form.keyword) {
      return true
    } else {
      if (item.name.includes(form.keyword) || item.code.includes(form.keyword)) {
        return true
      } else {
        return false
      }
    }
  })
  return result
})

const getList = () => {
  loading.value = true
  listApi().then(r => {
    if (r) {
      allList.value = r.data
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

const addEditHandle = (id) => {
  visible.value = true
  nextTick(() => {
    refAddEdit.value.init(id)
  })
}

const deleteHandle = (id) => {
  ElMessageBox.confirm(`确定对[id=${ id }]进行[删除]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteApi({ keys: [id] }).then(r => {
      if (r) {
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        getList()
        if (id === value.value) {
          value.value = ''
          emits('change', '')
        }
      }
    })
  }).catch(() => {
    // to do something on canceled
  })
}

const clickHandle = (row) => {
  value.value = row.id
  emits('change', row)
}

onBeforeMount(() => {
  getList()
})
</script>

<template>
  <div class="sidebar-container height-full width-300 flex flex_d-column" v-drag-resize>
    <div class="padding-10 flex">
      <el-input class="margin_r-10" v-model="form.keyword">
        <template #suffix>
          <Iconfont name="search" />
        </template>
      </el-input>
      <el-button v-repeat @click="getList()">
        <iconfont name="refresh" />
      </el-button>
      <el-button v-permission="'dict:create'" type="primary" @click="addEditHandle()">
        <iconfont name="plus" />
      </el-button>
    </div>
    <el-scrollbar class="flex-item_f-1" v-loading="loading">
      <ul class="padding-n-10">
        <li
          class="cursor-pointer font-size-14"
          :class="{ 'is-active': item.id === value }"
          v-for="item in list"
          :key="item.id"
          @click="clickHandle(item)">
          <el-tooltip
            effect="dark"
            placement="right"
            :content="item.remark"
            :show-after="1000">
            <div class="flex flex_j_c-space-between flex_a_i-center height-24">
              <div class="ellipse">{{item.name}}</div>
              <div :class="`code-box${ havePermission('dict:create|dictSub:delete') ? ' code-hide' : ''}`">{{item.code}}</div>
              <div :class="`botton-box${ havePermission('dict:create|dictSub:delete') ? ' botton-show' : '' }`">
                <el-button
                  v-permission="'dict:update'"
                  size="small"
                  @click.stop="addEditHandle(item.id)">
                  <Iconfont name="edit" size="12px" />
                </el-button>
                <el-button
                  v-permission="'dict:delete'"
                  size="small"
                  @click.stop="deleteHandle(item.id)">
                  <Iconfont name="delete" size="12px" />
                </el-button>
              </div>
            </div>
          </el-tooltip>
        </li>
      </ul>
    </el-scrollbar>
    <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  ul {
    li + li {
      margin-top: 10px;
    }
    li {
      &:hover {
        color: var(--el-color-primary);
        .code-hide {
          display: none;
        }
        .botton-show {
          display: block;
        }
      }
      .code-box {
        color: var(--el-text-color-placeholder);
      }
      .botton-box {
        display: none;
      }
    }
    .is-active {
      color: var(--el-color-primary)
    }
  }
}
</style>
