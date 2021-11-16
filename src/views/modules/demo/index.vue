<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-01 16:37:45
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-07 10:27:47
-->
<template>
  <div class="demo">
    <div>
      <el-card class="card">
        <div class="echart" ref="refWeek" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, ref, nextTick } from 'vue'

import * as echarts from 'echarts'

import { weeklyVisitsApi } from '@/api/demo'

export default defineComponent({
  setup() {
    const refWeek = ref()

    const data = reactive({
      disabled: false,
      weekChart: null,
      weekOption: {
        title: {
          text: '最近一周访问量',
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
      }
    })

    const init = async () => {
      const r = await weeklyVisitsApi()
      if (r) {
        data.weekOption.xAxis.data = r.data.map(item => item.date)
        data.weekOption.series[0].data = r.data.map(item => item.count)
      }
      data.weekChart = echarts.init(refWeek.value)
      data.weekChart.setOption(data.weekOption)
    }

    onMounted(() => {
      nextTick(() => {
        init()
      })
    })
    return {
      refWeek,
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_mixin.scss';
.demo {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  & > div {
    flex: 1;
    height: 500px;
    padding: 0 20px 10px 20px;
    text-align: center;
    min-width: 500px;
    .card {
      height: 100%;
      width: 100%;
      ::v-deep(.el-card__body) {
        height: 100%;
        width: 100%;
      }
      .echart {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
