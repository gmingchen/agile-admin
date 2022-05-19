<template>
  <el-popover
    trigger="click"
    placement="bottom-start"
    width="316px">
    <div>
      <div class="flex-item_f-1 flex-box flex_w-wrap">
        <div class="padding-5" v-for="(item, index) in list" :key="index">
          <el-button
            size="small"
            :class="{ 'is-active': item === value }"
            :disabled="readonly"
            @click="clickHandle(item)">
            <Iconfont :name="item" />
          </el-button>
        </div>
      </div>
      <el-pagination
        class="flex_j_c-space-between"
        v-model:currentPage="page.current"
        v-model:page-size="page.size"
        :total="icons.length"
        layout="prev, next" />
    </div>
    <template #reference>
      <el-input
        v-model="value"
        placeholder="图标"
        clearable
        :readonly="readonly">
        <template #prefix>
          <Iconfont :name="value" v-if="value" />
        </template>
      </el-input>
    </template>
  </el-popover>
</template>

<script >
import { computed, defineComponent, reactive, toRefs, watch, watchEffect } from 'vue'

import useModel from '@/mixins/model'
import { UPDATE_MODEL_EVENT } from '@/utils/constant'

export default defineComponent({
  emits: [UPDATE_MODEL_EVENT],
  props: {
    modelValue: {
      type: [String],
      required: true
    },
    readonly: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const value = useModel(props)

    const data = reactive({
      page: {
        current: 1,
        size: 30
      }
    })

    const icons = ['admin', 'backup', 'clear', 'clock', 'code', 'config', 'data-dictionary', 'demo', 'development', 'druid', 'email', 'error-log', 'exit-full-screen', 'folder', 'full-screen', 'generator', 'git', 'gitee', 'github', 'home', 'language', 'lock', 'log', 'login-log', 'maximize', 'menu', 'message', 'operation-log', 'reduction', 'refresh', 'region', 'request', 'role', 'set', 'system', 'task-log', 'template', 'user', 'verification', 'websocket']

    const list = computed(() => {
      const { current, size } = data.page
      let result = icons.slice(size * (current - 1), size * (current - 1) + size)
      if (current !== 1 && result.length === 0) {
        result = icons.slice(size * (current - 2), size * (current - 2) + size)
      }
      return result
    })

    watchEffect(() => {
      const index = icons.indexOf(value.value)
      const page = parseInt(index / data.page.size) + 1
      data.page.current = page
    })

    const clickHandle = (icon) => {
      value.value = icon
    }

    return {
      value,
      ...toRefs(data),
      list,
      icons,
      clickHandle
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
