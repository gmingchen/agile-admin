<script setup>
import useModel from '@/hooks/model'

import { UPDATE_MODEL_EVENT } from '@/utils/constant'

import { selectPageApi } from '@/api/tenant'

const emits = defineEmits(['change', UPDATE_MODEL_EVENT])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  }
})

const value = useModel(props)

const loading = ref(false)
const form = reactive({
  keyword: ''
})
const page = reactive({
  current: 1,
  size: 10,
  total: -1
})
const list = ref([{ id: '', name: '全部' }])

const reload = ref(false)
const disabled = computed(() => loading.value || (list.value.length >= page.total && page.total !== -1))

const getList = () => {
  const { current, size } = page
  const params = {
    name: form.keyword,
    current,
    size
  }
  loading.value = true
  selectPageApi(params).then(r => {
    if (r) {
      list.value.push(...r.data.list)
      page.total = r.data.total
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

const reacquireHandle = () => {
  page.current = 1
  list.value = [{ id: '', name: '全部' }]
  reload.value = true
  nextTick(() => {
    reload.value = false
  })
}

const clickHandle = (row) => {
  value.value = row.id
  emits('change', row)
}

const loadHandle = () => {
  if (list.value.length < page.total || page.total === -1) {
    getList()
    page.current += 1
  }
}
</script>

<template>
  <div class="width-200 height-full flex flex_d-column" v-drag-resize>
    <div class="padding-10 flex">
      <el-input class="margin_r-10" v-model="form.keyword" />
      <el-button v-repeat @click="reacquireHandle">
        <iconfont name="search" />
      </el-button>
    </div>
    <el-scrollbar class="flex-item_f-1" v-loading="loading">
      <ul
        class="padding-n-10"
        v-if="!reload"
        v-infinite-scroll="loadHandle"
        :infinite-scroll-disabled="disabled">
        <li
          class="margin_b-10 cursor-pointer flex flex_a_i-center"
          :class="{ 'active': item.id === value }"
          v-for="item in list"
          :key="item.id"
          @click="clickHandle(item)">
          <div class="flex-item_f-1 width-0 ellipse">
            {{ item.name }}
          </div>
          <el-tag :type="item.status_type" v-if="item.status_dict">{{ item.status_dict }}</el-tag>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
ul {
  li:hover {
    color: var(--el-color-primary);
  }
  .active {
    color: var(--el-color-primary)
  }
}
</style>
