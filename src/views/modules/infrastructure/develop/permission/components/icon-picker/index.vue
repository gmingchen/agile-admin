<template>
  <el-popover
    trigger="click"
    placement="bottom-start"
    width="316px"
    :disabled="disabled">
    <div :class="n.b()">
      <div class="f_f-1 fw-wrap">
        <div class="p-5" v-for="(item, index) in filterList" :key="index">
          <el-button size="small" :class="n.is('active', item === value)" @click="onClick(item)">
            <Icon :name="item" />
          </el-button>
        </div>
      </div>
      <el-pagination
        class="f_jc-space-between"
        v-model:currentPage="page.current"
        v-model:page-size="page.size"
        :total="list.length"
        layout="prev, next" />
    </div>
    <template #reference>
      <el-input v-model="value" placeholder="图标" clearable :disabled="disabled">
        <template v-if="list.includes(value)" #prefix>
          <Icon :name="value" />
        </template>
      </el-input>
    </template>
  </el-popover>
</template>

<script setup>
import { Icon } from '@/components'
import { useNamespace, useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks'

const n = useNamespace('icon-picker')

const emits = defineEmits([UPDATE_MODEL_EVENT])

const props = defineProps({
  [MODEL_NAME]: {
    type: [String],
    required: true
  },
  disabled: {
    type: Boolean,
    default: () => false
  }
})
const value = useModel(props)

const page = reactive({
  current: 1,
  size: 30
})
const list = ref([])
const filterList = computed(() => {
  const { current, size } = page
  let result = list.value.slice(size * (current - 1), size * (current - 1) + size)
  if (current !== 1 && result.length === 0) {
    result = list.value.slice(size * (current - 2), size * (current - 2) + size)
  }
  return result
})

watchEffect(() => {
  const index = list.value.indexOf(value.value)
  page.current = parseInt(index / page.size) + 1
})

const getData = () => {
  fetch('//at.alicdn.com/t/c/font_3225946_24q5ehak3jj.css')
    .then(r => r.text())
    .then(r => {
      if (r) {
        const arr = r.match(/.icon-(.+?):/g)
        list.value = arr.map(item => {
          return item.match(/.icon-(.+?):/)[1]
        })
      }
    })
}

const onClick = (icon) => {
  value.value = icon
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: sidebar#{$element-separator};
@include b(icon-picker) {}
</style>
