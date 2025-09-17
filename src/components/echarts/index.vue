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

let chart = null
let resizeObserver = null

const draw = (options) => {
  chart = echarts.init(chartRef.value)
  chart.setOption(options)
}

const handleResize = () => {
  resizeObserver = new ResizeObserver(() => {
    if (chart) {
      chart.resize()
    }
  })
  resizeObserver.observe(echartsRef.value)
}

onMounted(handleResize)

onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
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
