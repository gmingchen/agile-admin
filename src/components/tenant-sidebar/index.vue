<template>
  <div :class="n.b()" v-drag-resize>
    <el-scrollbar v-if="!reload" class="f_f-1" v-loading="loading">
      <ul v-if="!reload" class="p-10" v-infinite-scroll="onLoad" :infinite-scroll-disabled="disabled">
        <li
          :class="['mb-10', 'c-pointer', 'f_ai-center', n.is('active', item.id === value)]"
          v-for="item in list"
          :key="item.id"
          @click="onClick(item)">
          <div class="f_f-1 w-0 e">{{ item.name }}</div>
          <el-tag :type="item.status_type" v-if="item.status_dict">{{ item.status_dict }}</el-tag>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { tenantSelectPageApi } from '@/apis'
import { useNamespace, useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks'

const n = useNamespace('tenant-sidebar')

const emits = defineEmits([UPDATE_MODEL_EVENT, 'change'])
const props = defineProps({
  [MODEL_NAME]: {
    type: [String, Number],
    required: true
  },
})
const value = useModel(props)

const loading= ref(false)
const keyword = ref('')
const page = reactive({
  current: 1,
  size: 10,
  total: -1
})
const list = ref([{ id: '', name: '全部' }])

const reload = ref(false)
const disabled = computed(() => loading.value || (list.value.length >= page.total && page.total !== -1))

const getData = () => {
  loading.value = true
  const { current, size } = page
  const params = {
    name: keyword.value,
    current,
    size
  }
  tenantSelectPageApi(params).then(r => {
    if (r) {
      list.value.push(...r.data.list)
      page.total = r.data.total
    }
    nextTick(() => loading.value = false)
  })
}

const handleReacquire = () => {
  page.current = 1
  reload.value = true
  nextTick(() => reload.value = false)
}

const onSearch = () => handleReacquire()

const onLoad = () => {
  if (list.value.length < page.total || page.total === -1) {
    getData()
    page.current += 1
  }
}

const onClick = (row) => {
  value.value = row.id
  emits('change', row)
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: tenant-sidebar#{$element-separator};
@include b(tenant-sidebar) {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;

  ul {
    font-size: 14px;
    li:hover {
      color: var(--el-color-primary);
    }
    @include when(active) {
      color: var(--el-color-primary)
    }
  }
}
</style>
