<template>
  <div :class="n.b()">
    <Panel title="增长量">
      <Echarts ref="echartsRef" :class="n.e('chart')"></Echarts>
    </Panel>
  </div>
</template>

<script setup>
import { Echarts } from '@/components'
import Panel from '../panel/index.vue'
import { userGrowthStatApi } from '@/apis'
import { useNamespace } from '@/hooks'
import { onMounted } from 'vue'

const n = useNamespace('growth-chart')

const echartsRef = useTemplateRef('echartsRef')

const getData = () => {
  userGrowthStatApi().then(r => {
    if (r) {
      const options = {
        title: { text: '最近30天用户增长统计', left: 'center' },
        tooltip: { show: true, trigger: 'item' },
        xAxis: { type: 'category', data: [] },
        yAxis: { type: 'value' },
        series: [{ data: [], type: 'line', smooth: true }]
      }
      options.xAxis.data = r.data.map(item => item.date)
      options.series[0].data = r.data.map(item => item.count)
      echartsRef.value.draw(options)
    }
  })
}

onMounted(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: growth-chart#{$element-separator};
@include b(growth-chart) {
  @include e(chart) {
    width: 100%;
    height: 400px;
  }
}
</style>
