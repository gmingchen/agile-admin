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
import { computed, defineComponent, onBeforeMount, reactive, toRefs, watch, watchEffect } from 'vue'
import axios from 'axios'

import useModel from '@/mixins/model'
import { UPDATE_MODEL_EVENT, CONTENT_TYPE, TIME_OUT } from '@/utils/constant'

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
      icons: [],
      page: {
        current: 1,
        size: 30
      }
    })

    const list = computed(() => {
      const { current, size } = data.page
      let result = data.icons.slice(size * (current - 1), size * (current - 1) + size)
      if (current !== 1 && result.length === 0) {
        result = data.icons.slice(size * (current - 2), size * (current - 2) + size)
      }
      return result
    })

    watchEffect(() => {
      const index = data.icons.indexOf(value.value)
      const page = parseInt(index / data.page.size) + 1
      data.page.current = page
    })

    const getIconfont = () => {
      const service = axios.create({
        timeout: TIME_OUT,
        headers: {
          'Content-Type': CONTENT_TYPE
        }
      })
      service({
        url: '//at.alicdn.com/t/c/font_3225946_j1j10aooqn.css',
        method: 'get'
      }).then(r => {
        if (r.status === 200) {
          const arr = r.data.match(/.icon-(.+?):/g)
          data.icons = arr.map(item => {
            return item.match(/.icon-(.+?):/)[1]
          })
        }
      })
    }

    const clickHandle = (icon) => {
      value.value = icon
    }

    onBeforeMount(() => {
      getIconfont()
    })

    return {
      value,
      ...toRefs(data),
      list,
      clickHandle
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
