<template>
  <div :class="n.b()" v-drag-resize>
    <div class="p-10 f_ai-center">
      <el-input class="mr-10" v-model="keyword" :disabled="loading">
        <template #suffix>
          <Icon name="search" />
        </template>
      </el-input>
      <el-button v-repeat :disabled="loading" @click="getData">
        <Icon name="refresh" />
      </el-button>
      <el-button v-permission="'dict:create'" type="primary" @click="onAddOrEdit()">
        <Icon name="plus" />
      </el-button>
    </div>
    <el-scrollbar class="p-10 f_f-1" v-loading="loading">
      <ul class="pv-10 fs-14">
        <li
          :class="[n.e('dict-item'), n.is('active', item.id === value), 'c-pointer']"
          v-for="item in filterList"
          :key="item.id"
          @click="onClick(item)">
          <el-tooltip :content="item.remark" :disabled="!item.remark" :show-after="1000" placement="left">
            <div class="f_jc-space-between f_ai-center h-24">
              <div class="e">{{item.name}}</div>
              <div :class="[n.e('dict-code'), n.is('has-permission', hasPermission('dict:create|dictSub:delete'))]">{{item.code}}</div>
              <div :class="n.e('dict-operate')" v-permission="'dict:create|dictSub:delete'">
                <el-button v-permission="'dict:update'" size="small" @click.stop="onAddOrEdit(item.id)">
                  <Icon name="edit" size="12px" />
                </el-button>
                <el-button v-permission="'dict:delete'" size="small" @click.stop="onDelete(item.id)">
                  <Icon name="delete" size="12px" />
                </el-button>
              </div>
            </div>
          </el-tooltip>
        </li>
      </ul>
    </el-scrollbar>
    <AddEdit ref="addEditRef" @confirm="getData"></AddEdit>
  </div>
</template>

<script setup>
import { Icon } from '@/components'
import AddEdit from '../add-edit/index.vue'
import { hasPermission } from '@/permission'
import { dictListApi, dictDeleteApi } from '@/apis'
import { useNamespace, useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks'

const n = useNamespace('sidebar')

const emits = defineEmits([UPDATE_MODEL_EVENT, 'change'])
const props = defineProps({
  [MODEL_NAME]: {
    type: [String, Number],
    required: true
  },
})
const value = useModel(props)

const addEditRef = useTemplateRef('addEditRef')

const loading = ref(false)
const keyword = ref('')
const list = ref([])
const filterList = computed(() =>
  list.value.filter(({ name, code }) =>
    !keyword.value || name.includes(keyword.value) || code.includes(keyword.value)
  )
)

const getData = () => {
  loading.value = true
  dictListApi().then(r => {
    if (r) list.value = r.data
    nextTick(() => loading.value = false)
  })
}

const onClick = (row) => {
  value.value = row.id
  emits('change', row)
}

const onAddOrEdit = (id) => {
  addEditRef.value.open(id)
}
const onDelete = (id) => {
  ElMessageBox.confirm(
    `确定对[id=${ id }]进行[删除]操作?`,
    { title: '提示', confirmButtonText: '确认', type: 'warning' }
  ).then(() => {
    dictDeleteApi({ keys: [id] }).then(r => {
      if (r) {
        ElMessage.success('操作成功!')
        getData()
        if (id === value.value) {
          value.value = ''
          emits('change')
        }
      }
    })
  }).catch(() => {})
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;

$prefix: sidebar#{$element-separator};

@include b(sidebar) {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  @include e(dict-item) {
    &:hover {
      color: var(--el-color-primary);
      .#{$prefix}dict-code{
        @include when(has-permission) {
          display: none;
        }
      }
      .#{$prefix}dict-operate {
        display: block;
      }
    }
    & + & {
      margin-top: 10px;
    }
    @include when(active) {
      color: var(--el-color-primary)
    }
  }
  @include e(dict-code) {
    color: var(--el-text-color-placeholder);
  }
  @include e(dict-operate) {
    display: none;
  }
}
</style>
