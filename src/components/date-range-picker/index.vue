<template>
  <el-date-picker
    :class="[n.b(), 'w-250_i']"
    v-model="value"
    type="daterange"
    range-separator="-"
    value-format="YYYY-MM-DD"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :disabled-date="date => new Date().getTime() < date.getTime()"
    clearable
    v-bind="$attrs">
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </el-date-picker>
</template>

<script setup>
import { useNamespace } from '@/hooks';

const n = useNamespace('date-range-picker')

const emits = defineEmits(['update:start', 'update:end'])

const props = defineProps({
  start: {
    type: [String, Number],
    required: true
  },
  end: {
    type: [String, Number],
    required: true
  }
})

const value = computed({
  get: () => {
    const { start, end } = props
    if (start && end) {
      return [start, end]
    } else {
      return []
    }
  },
  set: val => {
    let start = ''
    let end = ''
    if (val) {
      start = val[0] + ' 00:00:00'
      end = val[1] + ' 23:59:59'
    }
    emits('update:start', start)
    emits('update:end', end)
  }
})

</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(date-range-picker) {}
</style>
