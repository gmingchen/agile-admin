<template>
  <div class="panel padding-15">
    <div class="panel-title margin_b-10 font-size-18">访问量</div>
    <div class="panel-content">
      <div class="height-full width-full" ref="refEchart" />
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs } from 'vue'

import * as echarts from 'echarts'

import { visitsApi } from '@/api/home'

export default defineComponent({
  setup() {
    const refEchart = ref()
    const data = reactive({
      echart: null,
      option: {
        title: {
          text: '最近30天访问量',
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
      },
      list: []
    })

    const getList = async () => {
      const r = await visitsApi()
      if (r) {
        data.list = r.data
      } else {
        data.list = []
      }
    }

    const init = async () => {
      await getList()
      data.option.xAxis.data = data.list.map(item => item.date)
      data.option.series[0].data = data.list.map(item => item.count)
      data.echart = echarts.init(refEchart.value)
      data.echart.setOption(data.option)
    }

    onMounted(() => {
      nextTick(() => {
        init()
      })
    })

    return {
      refEchart,
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.panel {
  height: fit-content;
  min-width: 400px;
  border-radius: var(--el-border-radius-base);
  background-color: var(--gl-content-panel-background-color);
  &-title {
    font-weight: 700;
  }
  &-content {
    height: 500px;
  }
}
</style>
