<template>
  <div ref="echartsRef" :class="n.b()">
    <div ref="chartRef" :class="n.e('chart')"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { useNamespace } from '@/hooks'

const n = useNamespace('echarts')

const echartsRef = useTemplateRef('echartsRef')
const chartRef = useTemplateRef('chartRef')

const chart = ref(null)
const resizeObserver = ref(null)

const draw = (options) => {
  chart.value = markRaw(echarts.init(chartRef.value))
  chart.value.setOption(options)
}

const handleResize = () => {
  resizeObserver.value = new ResizeObserver(() => {
    if (chart.value) {
      chart.value.resize()
    }
  })
  resizeObserver.value.observe(echartsRef.value)
}

onMounted(handleResize)

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.dispose()
  }
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
})

defineExpose({
  draw,
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: echarts#{$element-separator};
@include b(echarts) {
  @include e(chart) {
    width: 100%;
    height: 100%;
  }
}
</style>
