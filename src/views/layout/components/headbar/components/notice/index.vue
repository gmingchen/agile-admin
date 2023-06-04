<script setup>
const noticeStore = useNoticeStore()
const router = useRouter()

const list = computed(() => noticeStore.list)
const total = computed(() => noticeStore.page.total)

const refScrollbar = ref()
const loading = ref(false)

const readHandle = async (row) => {
  const ids = row ? [row.id] : []
  await noticeStore.read(ids)
  nextTick(() => {
    refScrollbar.value.setScrollTop(0)
  })
}

const viewHandle = () => {
  router.push({
    name: 'personal',
    query: {
      panel: 'notice'
    }
  })
}

const loadHandle = async () => {
  if (list.value.length < total.value || total.value === -1) {
    loading.value = true
    noticeStore.page.current += 1
    await noticeStore.getList()
    nextTick(() => {
      loading.value = false
    })
  }
}

onBeforeMount(() => {
  noticeStore.getList()
})
</script>

<template>
  <el-popover :width="350" trigger="click" popper-class="notice-popover">
    <template #reference>
      <el-badge
        :value="total"
        :max="20"
        class="margin_r-25 cursor-pointer"
        :hidden="total < 1">
        <Iconfont size="16px" name="bell" />
      </el-badge>
    </template>
    <div class="notice-container flex flex_d-column height-300">
      <template v-if="total">
        <el-scrollbar ref="refScrollbar" class="flex-item_f-1">
          <ul class="notice-box" v-infinite-scroll="loadHandle" :infinite-scroll-disabled="loading">
            <li class="notice-item flex flex_j_c-space-between flex_a_i-center" v-for="item in list" :key="item.id">
              <div class="notice-content flex-item_f-1 margin-n-5">
                <div class="notice-time margin_b-3 font-size-12">
                  <el-tag :type="item.status_type" size="small">{{ item.type_dict }}</el-tag>
                  <span class="margin_l-10">{{ item.createdAt }}</span>
                </div>
                <div class="ellipse font-size-14">{{ item.content }}</div>
              </div>
              <el-button
                v-repeat
                type="primary"
                size="small"
                link
                @click="readHandle(item)">已读</el-button>
            </li>
            <li
              class="loading"
              v-loading="loading"
              element-loading-text="加载中..." />
          </ul>
        </el-scrollbar>
        <div class="flex flex_j_c-space-between padding-5">
          <el-button
            type="primary"
            size="small"
            link
            @click="viewHandle">查看所有</el-button>
          <el-button
            v-repeat
            type="primary"
            size="small"
            link
            @click="readHandle()">全部已读</el-button>
        </div>
      </template>
      <el-empty v-else description="暂无数据" />
    </div>
  </el-popover>
</template>

<style lang="scss">
.notice-popover {
  padding: 0!important;
}
</style>
<style lang="scss" scoped>
.notice-container {
  .notice-box {
    .notice-item {
      padding: 0 10px;
      margin-top: 10px;
      .notice-time {
        color: var(--el-text-color-placeholder);
      }
      .notice-content {
        overflow: hidden;
      }
    }
    .notice-item + .notice-item {
      margin-top: 10px;
    }
    .loading {
      ::v-deep(.el-loading-spinner) {
        margin-top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          margin-right: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
