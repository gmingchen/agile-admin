<template>
  <el-popover :width="350" trigger="click" popper-class="notice-popover">
    <template #reference>
      <el-badge :value="page.total" :max="99" :hidden="page.total < 1">
        <Icon  class="c-pointer" size="16px" name="bell" />
      </el-badge>
    </template>
    <div :class="n.b()">
      <template v-if="page.total">
        <el-scrollbar class="f_f-1" @end-reached="onLoad">
          <ul :class="n.e('wrap')">
            <li :class="n.e('item')" v-for="item in list" :key="item.id">
              <div class="f_f-1">
                <div class="f_ai-center">
                  <el-tag :type="item.status_type" size="small">{{ item.type_dict }}</el-tag>
                  <span :class="n.e('time')">{{ item.createdAt }}</span>
                </div>
                <el-tooltip :content="item.content" placement="bottom-end" :show-after="500">
                  <div :class="[n.e('content'), 'e']">{{ item.content }}</div>
                </el-tooltip>
              </div>
              <el-button type="primary" size="small" link @click="onRead(item.id)">已读</el-button>
            </li>
            <li :class="n.e('loading')" v-loading="loading" element-loading-text="加载中..." />
          </ul>
        </el-scrollbar>
        <div :class="n.e('footer')">
          <el-button type="primary" size="small" link @click="onViewAll">查看全部</el-button>
          <el-button type="primary" size="small" link @click="onRead()">全部已读</el-button>
        </div>
      </template>
      <el-empty v-else description="暂无数据" />
    </div>
  </el-popover>
</template>

<script setup>
import { Icon } from '@/components'
import { useNoticeStore } from '@/stores'
import { useNamespace } from '@/hooks'

const n = useNamespace('notice')

const router = useRouter()

const noticeStore = useNoticeStore()
const { list, page } = storeToRefs(noticeStore)

const loading = ref(false)

const onLoad = async () => {
  if (loading.value) return

  if (list.value.length < page.value.total || page.value.total === -1) {
    loading.value = true
    page.value.current++
    await noticeStore.getData()
    nextTick(() => loading.value = false)
  }
}

const onRead = (id) => {
  const ids = id ? [id] : []
  ElMessageBox.confirm(
    `确定对[${ id ? `id=${ ids.join(',') }` : '所有通知' }]进行[已读]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(async () => {
    await noticeStore.setRead(ids)
    ElMessage.success('操作成功!')
  }).catch(() => {})
}

const onViewAll = () => {
  router.push({
    name: 'personal',
    query: { tab: 'notice' }
  })
}

onBeforeMount(() => {
  page.value.current = 1
  noticeStore.getData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: notice#{$element-separator};
@include b(notice) {
  height: 300px;
  display: flex;
  flex-direction: column;
  @include e(item) {
    padding: 0 10px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @include e(time) {
    margin-left: 10px;
    font-size: 12px;
    color: var(--el-text-color-placeholder);
  }
  @include e(content) {
    margin-top: 5px;
    font-size: 14px;
    cursor: pointer;
  }
  @include e(loading) {
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
  @include e(footer) {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>

<style lang="scss">
.notice-popover {
  padding: 0!important;
}
</style>
