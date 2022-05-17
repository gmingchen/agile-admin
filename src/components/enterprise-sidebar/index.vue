<template>
  <div class="enterprise-sidebar-container height-full width-200 flex-box flex_d-column">
    <el-input class="margin_b-10" v-model="form.name" @keyup.enter="reacquireHandle()">
      <template #suffix>
        <Iconfont name="search" />
      </template>
    </el-input>
    <el-scrollbar class="flex-item_f-1" v-loading="loading">
      <ul>
        <li
          class="cursor-pointer font-size-14 ellipse-1"
          :class="{ 'is-active': item.id === value }"
          v-for="item in list"
          :key="item.id"
          @click="clickHandle(item)">
          {{item.name}}
        </li>
      </ul>
    </el-scrollbar>
    <el-pagination
      class="margin_t-10 flex_j_c-space-between"
      layout="prev, pager, next"
      :current-page="page.current"
      :page-size="page.size"
      :total="page.total"
      @current-change="pageChangeHandle"
      small
      hide-on-single-page />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, toRefs } from 'vue'

import usePage from '@/mixins/page'
import useModel from '@/mixins/model'
import { UPDATE_MODEL_EVENT } from '@/utils/constant'

import { pageSimplifyApi } from '@/api/enterprise'

export default defineComponent({
  emits: ['change', UPDATE_MODEL_EVENT],
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    }
  },
  setup(props, { emit }) {
    const value = useModel(props)

    const { page } = usePage()
    const data = reactive({
      loading: false,
      form: {
        name: '',
        date: []
      },
      list: []
    })

    const getList = () => {
      const params = {
        name: data.form.name,
        current: page.current,
        size: page.size
      }
      data.loading = true
      pageSimplifyApi(params).then(r => {
        if (r) {
          data.list = r.data.list
          page.total = r.data.total
        }
        nextTick(() => { data.loading = false })
      })
    }

    const reacquireHandle = () => {
      page.current = 1
      getList()
    }

    const clickHandle = (row) => {
      value.value = row.id
      emit('change', row)
    }

    const pageChangeHandle = (val) => {
      page.current = val
      getList()
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      value,
      page,
      ...toRefs(data),
      reacquireHandle,
      clickHandle,
      pageChangeHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.enterprise-sidebar-container {
  ul {
    li + li {
      margin-top: 10px;
    }
    li {

      &:hover {
        color: var(--el-color-primary)
      }
    }
    .is-active {
      color: var(--el-color-primary)
    }
  }
}
</style>
