<script setup>
import * as echarts from 'echarts'

import { userGrowthApi } from '@/api/home'

const refEchart = ref()
const echart = ref(null)
const option = reactive({
  title: {
    text: '最近30天用户增长统计',
    left: 'center'
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true
    }
  ]
})
const list = ref([])

const getList = async () => {
  const r = await userGrowthApi()
  if (r) {
    list.value = r.data
  } else {
    list.value = []
  }
}

const init = async () => {
  await getList()
  option.xAxis.data = list.value.map(item => item.date)
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
  nextTick(() => {
    init()
    window.addEventListener('resize', resizeHandle)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandle)
})
</script>

<template>
  <div class="padding-10">
    <div class="panel padding-15">
      <div class="panel-title margin_b-10 font-size-18">增长量</div>
      <div class="panel-content">
        <div class="height-full width-full" ref="refEchart" />
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
