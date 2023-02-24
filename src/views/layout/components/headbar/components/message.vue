<template>
  <el-popover :width="350" trigger="click" popper-class="message-popover">
    <template #reference>
      <el-badge
        :value="total"
        :max="20"
        class="margin_r-25 cursor-pointer"
        :hidden="total === 0">
        <Iconfont size="16px" name="bell" />
      </el-badge>
    </template>
    <div class="message-container flex-box flex_d-column height-300">
      <template v-if="total">
        <el-scrollbar class="flex-item_f-1">
          <div class="message-box">
            <div class="message-item flex-box flex_j_c-space-between flex_a_i-center" v-for="item in list" :key="item.id">
              <div class="message-content flex-item_f-1 margin-n-5">
                <div class="message-time margin_b-3 font-size-12">
                  <el-tag size="small">{{ item.type_dict }}</el-tag>
                  <span class="margin_l-10">{{ item.created_at }}</span>
                </div>
                <div class="ellipse font-size-14">{{ item.content }}</div>
              </div>
              <el-button
                v-repeat
                v-permission="'websocketAdministrator:read'"
                type="primary"
                size="small"
                link
                @click="readHandle(item)">已读</el-button>
            </div>
          </div>
        </el-scrollbar>
        <div class="flex-box flex_j_c-space-between padding-5">
          <el-button
            type="primary"
            size="small"
            link
            @click="viewHandle">查看所有</el-button>
          <el-button
            v-repeat
            v-permission="'websocketAdministrator:allRead'"
            type="primary"
            size="small"
            link
            @click="readAllHandle">全部已读</el-button>
        </div>
      </template>
      <el-empty v-else description="暂无数据" />
    </div>
  </el-popover>
</template>

<script>
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import useDictionary from '@/mixins/dictionary'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const list = computed(() => store.state.message.list)
    const total = computed(() => store.state.message.page.total)

    const { getDictionary } = useDictionary()

    const readHandle = (row) => {
      store.dispatch('message/read', [row.id])
    }

    const readAllHandle = () => {
      store.dispatch('message/readAll')
    }

    const viewHandle = () => {
      router.push({
        name: 'personal',
        query: {
          panel: 'message'
        }
      })
    }

    onBeforeMount(() => {
      getDictionary('websocket')
      store.dispatch('message/getList')
    })

    return {
      list,
      total,
      readHandle,
      readAllHandle,
      viewHandle
    }
  }
})
</script>

<style lang="scss">
.message-popover {
  padding: 0!important;
}
</style>
<style lang="scss" scoped>
.message-container {
  .message-box {
    .message-item {
      padding: 0 10px;
      margin-top: 10px;
      .message-time {
        color: var(--el-text-color-placeholder);
      }
      .message-content {
        overflow: hidden;
      }
    }
    .message-item + .message-item {
      margin-top: 10px;
    }
  }
}

</style>
