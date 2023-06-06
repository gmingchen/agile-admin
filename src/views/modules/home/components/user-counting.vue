<script setup>
import CountTo from '@/components/count-to/index.vue'

import { userCountingApi } from '@/api/home'

const userVolume = ref(0)
const newUserVolume = ref(0)
const todayVisits = ref(0)
const onlineUserVolume = ref(0)

const init = async () => {
  const r = await userCountingApi()
  if (r) {
    userVolume.value = r.data.userVolume
    newUserVolume.value = r.data.newUserVolume
    todayVisits.value = r.data.todayVisits
    onlineUserVolume.value = r.data.onlineUserVolume
  }
}

onBeforeMount(() => {
  init()
})
</script>

<template>
  <div class="user-counting flex flex_w-wrap">
    <div class="counting-wrap flex-item_f-1 padding-10">
      <div class="counting-card height-90 padding-10 flex flex_j_c-space-between flex_a_i-center">
        <iconfont name="user-volume" size="60px" />
        <div class="height-60 flex flex_d-column flex_j_c-space-between flex_a_i-center">
          <div class="counting-title font-size-16">
            总用户量
          </div>
          <CountTo
            class="font-size-24"
            :startVal="0"
            :endVal="userVolume"
            :duration="2000" />
        </div>
      </div>
    </div>
    <div class="counting-wrap flex-item_f-1 padding-10">
      <div class="counting-card height-90 padding-10 flex flex_j_c-space-between flex_a_i-center">
        <iconfont name="new-user-volume" size="60px" />
        <div class="height-60 flex flex_d-column flex_j_c-space-between flex_a_i-center">
          <div class="counting-title font-size-16">
            新增用户量
          </div>
          <CountTo
            class="font-size-24"
            :startVal="0"
            :endVal="newUserVolume"
            :duration="2000" />
        </div>
      </div>
    </div>
    <div class="counting-wrap flex-item_f-1 padding-10">
      <div class="counting-card height-90 padding-10 flex flex_j_c-space-between flex_a_i-center">
        <iconfont name="visits" size="60px" />
        <div class="height-60 flex flex_d-column flex_j_c-space-between flex_a_i-center">
          <div class="counting-title font-size-16">
            今日访问量
          </div>
          <CountTo
            class="font-size-24"
            :startVal="0"
            :endVal="todayVisits"
            :duration="2000" />
        </div>
      </div>
    </div>
    <div class="counting-wrap flex-item_f-1 padding-10">
      <div class="counting-card height-90 padding-10 flex flex_j_c-space-between flex_a_i-center">
        <iconfont name="user-online" size="60px" />
        <div class="height-60 flex flex_d-column flex_j_c-space-between flex_a_i-center">
          <div class="counting-title font-size-16">
            在线用户量
          </div>
          <CountTo
            class="font-size-24"
            :startVal="0"
            :endVal="onlineUserVolume"
            :duration="2000" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-counting {
  .counting-wrap {
    .counting-card {
      min-width: 300px;
      background-color: var(--gl-content-panel-background-color);
      border-radius: var(--el-border-radius-base);
      cursor: pointer;
      &:hover {
        .iconfont {
          color: var(--el-color-primary);
        }
      }
      .counting-title {
        color: var(--el-text-color-placeholder);
      }
    }
  }
}
</style>
