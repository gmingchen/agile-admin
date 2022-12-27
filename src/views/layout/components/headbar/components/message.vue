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
                  <el-tag size="small">{{ dictionaryMap[item.type] }}</el-tag>
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

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@stores/message'

import useDictionary from '@/mixins/dictionary'

const messageStore = useMessageStore()
const router = useRouter()

const list = computed(() => messageStore.list)
const total = computed(() => messageStore.page.total)

const { dictionaryMap, getDictionary } = useDictionary()

const readHandle = (row) => {
  messageStore.read([row.id])
}

const readAllHandle = () => {
  messageStore.readAll()
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
  messageStore.getList()
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
