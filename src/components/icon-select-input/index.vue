<template>
  <el-popover
    trigger="click"
    placement="bottom-start"
    width="316px">
    <div>
      <div class="flex-item_f-1 flex-box flex_w-wrap">
        <div class="padding-5" v-for="(item, index) in list" :key="index">
          <el-button
            size="small"
            :class="{ 'is-active': item === value }"
            :disabled="readonly"
            @click="clickHandle(item)">
            <Iconfont :name="item" />
          </el-button>
        </div>
      </div>
      <el-pagination
        class="flex_j_c-space-between"
        v-model:currentPage="page.current"
        v-model:page-size="page.size"
        :total="icons.length"
        layout="prev, next" />
    </div>
    <template #reference>
      <el-input
        v-model="value"
        placeholder="图标"
        clearable
        :readonly="readonly">
        <template #prefix>
          <Iconfont :name="value" v-if="value" />
        </template>
      </el-input>
    </template>
  </el-popover>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref, toRefs, watchEffect } from 'vue'
import axios from 'axios'

import useModel from '@/mixins/model'
import { UPDATE_MODEL_EVENT, CONTENT_TYPE, TIME_OUT } from '@/utils/constant'

const emits = defineEmits([UPDATE_MODEL_EVENT])
const props = defineProps({
  modelValue: {
    type: [String],
    required: true
  },
  readonly: {
    type: Boolean,
    default: () => false
  }
})

const value = useModel(props)

const icons = ref([])
const page = reactive({
  current: 1,
  size: 30
})

const list = computed(() => {
  const { current, size } = page
  let result = icons.value.slice(size * (current - 1), size * (current - 1) + size)
  if (current !== 1 && result.length === 0) {
    result = icons.value.slice(size * (current - 2), size * (current - 2) + size)
  }
  return result
})

watchEffect(() => {
  const index = icons.value.indexOf(value.value)
  page.current = parseInt(index / page.size) + 1
})

const getIconfont = () => {
  const service = axios.create({
    timeout: TIME_OUT,
    headers: {
      'Content-Type': CONTENT_TYPE
    }
  })
  service({
    url: '//at.alicdn.com/t/c/font_3225946_mem6qq7wpdb.css',
    method: 'get'
  }).then(r => {
    if (r.status === 200) {
      const arr = r.data.match(/.icon-(.+?):/g)
      icons.value = arr.map(item => {
        return item.match(/.icon-(.+?):/)[1]
      })
    }
  })
}

const clickHandle = (icon) => {
  value.value = icon
}

onBeforeMount(() => {
  getIconfont()
})
</script>

<style lang="scss" scoped>

</style>
