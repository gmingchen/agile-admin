<template>
  <div :class="n.b()">
    <Panel title="用户地区">
      <Echarts ref="echartsRef" :class="n.e('chart')"></Echarts>
    </Panel>
  </div>
</template>

<script setup>
import { Echarts } from '@/components'
import Panel from '../panel/index.vue'
import { userRegionStatApi } from '@/apis'
import { useNamespace } from '@/hooks'
import { onMounted } from 'vue'

const n = useNamespace('region-chart')

const echartsRef = useTemplateRef('echartsRef')

const getData = () => {
  userRegionStatApi().then(r => {
    if (r) {
      const options = {
        title: { text: '用户地区分布情况统计', left: 'center' },
        tooltip: { show: true, trigger: 'item' },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            formatter: function(value) {
              return value.split('').join('\n')
            }
          }
        },
        yAxis: { type: 'value' },
        series: [{ data: [], type: 'bar', smooth: true }]
      }
      options.xAxis.data = r.data.map(item => item.region)
      options.series[0].data = r.data.map(item => item.count)
      echartsRef.value.draw(options)
    }
  })
}

onMounted(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: region-chart#{$element-separator};
@include b(region-chart) {
  @include e(chart) {
    width: 100%;
    height: 400px;
  }
}
</style>
