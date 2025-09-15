<template>
  <div :class="n.b()">
    <Panel title="访问量">
      <Echarts ref="echartsRef" :class="n.e('chart')"></Echarts>
    </Panel>
  </div>
</template>

<script setup>
import { Echarts } from '@/components'
import Panel from '../panel/index.vue'
import { userVisitsStatApi } from '@/apis'
import { useNamespace } from '@/hooks'
import { onMounted } from 'vue'

const n = useNamespace('visits-chart')

const echartsRef = useTemplateRef('echartsRef')

const getData = () => {
  userVisitsStatApi().then(r => {
    if (r) {
      const options = {
        title: { text: '最近30天用户访问统计', left: 'center' },
        tooltip: { show: true, trigger: 'item' },
        xAxis: { type: 'category', data: [], },
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
$prefix: visits-chart#{$element-separator};
@include b(visits-chart) {
  @include e(chart) {
    width: 100%;
    height: 400px;
  }
}
</style>
