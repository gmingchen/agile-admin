<template>
  <div class="enterprise-sidebar-container height-full width-200 flex flex_d-column">
    <el-input class="margin_b-10" v-model="form.name" @keyup.enter="reacquireHandle">
      <template #suffix>
        <Iconfont name="search" />
      </template>
    </el-input>
    <el-scrollbar class="flex-item_f-1" v-loading="loading">
      <ul>
        <li
          class="cursor-pointer font-size-14 ellipse"
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

<script setup>

import usePage from '@/hooks/page'
import useModel from '@/hooks/model'
import { UPDATE_MODEL_EVENT } from '@/utils/constant'

import { pageSimplifyApi } from '@/api/enterprise'

const emits = defineEmits(['change', UPDATE_MODEL_EVENT])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  }
})

const value = useModel(props)

const { page } = usePage()

const loading = ref(false)
const form = reactive({
  name: '',
  date: []
})
const list = ref([])

const getList = () => {
  const params = {
    name: form.name,
    current: page.current,
    size: page.size
  }
  loading.value = true
  pageSimplifyApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => { loading.value = false })
  })
}

const reacquireHandle = () => {
  page.current = 1
  getList()
}

const clickHandle = (row) => {
  value.value = row.id
  emits('change', row)
}

const pageChangeHandle = (val) => {
  page.current = val
  getList()
}

onBeforeMount(() => {
  getList()
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
