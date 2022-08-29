<template>
  <div class="sidebar-container height-full width-300 flex-box flex_d-column">
    <div class="margin_b-10 flex-box">
      <el-input class="margin_r-10" v-model="form.keyword">
        <template #suffix>
          <Iconfont name="search" />
        </template>
      </el-input>
      <el-button v-repeat @click="getList()">
        <iconfont name="refresh" />
      </el-button>
      <el-button v-permission="'dictionary:create'" type="primary" @click="addEditHandle()">
        <iconfont name="plus" />
      </el-button>
    </div>
    <el-scrollbar class="flex-item_f-1" v-loading="loading">
      <ul>
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
            <div class="flex-box flex_j_c-space-between flex_a_i-center height-24">
              <div class="ellipse-1">{{item.name}}</div>
              <div class="code-box">{{item.code}}</div>
              <div class="botton-box">
                <el-button
                  v-permission="'dictionary:update'"
                  size="small"
                  @click="addEditHandle(item.id)">
                  <Iconfont name="edit" size="12px" />
                </el-button>
                <el-button
                  v-permission="'dictionary:delete'"
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

<script setup>
import { computed, nextTick, onBeforeMount, reactive, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './add-edit.vue'

import useModel from '@/mixins/model'
import { UPDATE_MODEL_EVENT } from '@/utils/constant'

import { listApi, deleteApi } from '@/api/dictionary'

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

<style lang="scss" scoped>
.sidebar-container {
  ul {
    li + li {
      margin-top: 10px;
    }
    li {
      &:hover {
        color: var(--el-color-primary);
        .code-box {
          display: none;
        }
        .botton-box {
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
