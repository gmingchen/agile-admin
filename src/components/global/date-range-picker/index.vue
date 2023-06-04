<script setup>
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

const date = computed({
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

<template>
  <el-date-picker
    v-bind="$attrs"
    v-model="date"
    type="daterange"
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD"
    :disabled-date="date => new Date().getTime() < date.getTime()"
    clearable>
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </el-date-picker>
</template>
