<script setup>
import * as echarts from 'echarts'

import { userRegionApi } from '@/api/home'

const refEchart = ref()
const echart = ref(null)
const option = reactive({
  title: {
    text: '用户地区分布情况统计',
    left: 'center'
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
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
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar',
      smooth: true
    }
  ]
})
const list = ref([])

const getList = async () => {
  const r = await userRegionApi()
  if (r) {
    list.value = r.data
  } else {
    list.value = []
  }
}

const init = async () => {
  await getList()
  option.xAxis.data = list.value.map(item => item.region)
  option.series[0].data = list.value.map(item => item.count)
  echart.value = markRaw(echarts.init(refEchart.value))
  echart.value.setOption(option)
}

const resizeHandle = () => {
  if (echart.value) {
    echart.value.resize()
  }
}

onMounted(() => {
  init()
})

</script>

<template>
  <div class="padding-10">
    <div class="panel padding-15">
      <div class="panel-title margin_b-10 font-size-18">用户地区</div>
      <div class="panel-content">
        <div class="height-full width-full" ref="refEchart" v-resize="resizeHandle" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  height: fit-content;
  min-width: 600px;
  border-radius: var(--el-border-radius-base);
  background-color: var(--gl-content-panel-background-color);
  &-title {
    font-weight: 700;
  }
  &-content {
    height: 300px;
  }
}
</style>
