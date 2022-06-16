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

<script>
import { computed, defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './add-edit'

import useModel from '@/mixins/model'
import { UPDATE_MODEL_EVENT } from '@/utils/constant'

import { listApi, deleteApi } from '@/api/dictionary'

export default defineComponent({
  emits: ['change', UPDATE_MODEL_EVENT],
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    }
  },
  components: { AddEdit },
  setup(props, { emit }) {
    const value = useModel(props)

    const refAddEdit = ref()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        keyword: ''
      },
      allList: []
    })

    const list = computed(() => {
      const result = data.allList.filter(item => {
        if (!data.form.keyword) {
          return true
        } else {
          if (item.name.includes(data.form.keyword) || item.code.includes(data.form.keyword)) {
            return true
          } else {
            return false
          }
        }
      })
      return result
    })

    const getList = () => {
      data.loading = true
      listApi().then(r => {
        if (r) {
          data.allList = r.data
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    const addEditHandle = (id) => {
      data.visible = true
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
              emit('change', '')
            }
          }
        })
      }).catch(() => {
        // to do something on canceled
      })
    }

    const clickHandle = (row) => {
      value.value = row.id
      emit('change', row)
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      value,
      refAddEdit,
      ...toRefs(data),
      list,
      getList,
      addEditHandle,
      clickHandle,
      deleteHandle
    }
  }
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
