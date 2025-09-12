<template>
  <component
    :class="[n.b(), n.is('limit', isLimit)]"
    v-model:fileList="list"
    :is="h(
      Upload,
      {
        ref: handleRef,
        listType: 'picture-card',
        accept,
        limit,
        showFileList: true,
        'before-upload': onBeforeUpload,
        'on-remove': onRemove,
        'on-preview': onPreview,
        'on-error': onError,
        onSuccess: onSuccess,
        onFail: onFail,
        ...$attrs,
      },
      {
        default: () => h(Icon, { name: 'plus', size: '30px' })
      }
    )"
  />
  <el-image-viewer
    v-if="visible"
    :url-list="previewList"
    :initial-index="previewIndex"
    hide-on-click-modal
    teleported
    @close="visible = false" />
</template>

<script setup>
import { computed, getCurrentInstance, h, nextTick, ref, watch, } from 'vue'
import Icon from '../icon/index.vue'
import Upload from '../upload/index.vue'
import { useNamespace, useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks'

const n = useNamespace('upload-image')

const emits = defineEmits([UPDATE_MODEL_EVENT])

const props = defineProps({
  [MODEL_NAME]: {
    type: [String, Array],
    default: ''
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  limit: {
    type: Number,
    default: () => 1
  }
})

const value = useModel(props)
const list = ref([])

const isLimit = ref(false)
const monitor = ref(true)
watch(() => value.value, (val) => {
  if (monitor.value) {
    if (typeof val === 'string') {
      list.value = val ? [{ url: val }] : []
    } else {
      list.value = val.map(item => ({ url: item }))
    }
    isLimit.value = list.value.length >= props.limit
  }
  monitor.value = true
}, { immediate: true })

const updateValue = (files) => {
  monitor.value = false
  nextTick(() => {
    if (props.limit === 1) {
      const [file] = files
      if (file) {
        if (file.response) {
          value.value = file.response.data
        } else {
          value.value = file.url
        }
      } else {
        value.value = ''
      }
    } else {
      value.value = files.map(item => item.response ? item.response.data : item.url)
    }
  })
}

const onBeforeUpload = () => {
  isLimit.value = list.value.length + 1 >= props.limit
  return true
}
const onSuccess = (_url, _file, files) => {
  updateValue(files)
}
const onRemove = (_file, files) => {
  isLimit.value = false
  updateValue(files)
}
const onError = () => {
  isLimit.value = false
}
const onFail = () => {
  isLimit.value = false
}

/* 预览 */
const visible = ref(false)
const previewList = computed(() => list.value.map(item => item.url))
const previewIndex = ref(0)
const onPreview = (file) => {
  previewIndex.value = previewList.value.indexOf(file.url)
  visible.value = true
}

const instance = getCurrentInstance()
const handleRef = (exposed) => {
  instance.exposed = exposed
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: upload-image#{$element-separator};
@include b(upload-image) {
  --size: 100px;
  ::v-deep(.el-upload-list--picture-card) {
    --el-upload-list-picture-card-size: var(--size);
    .el-upload--picture-card {
      --el-upload-picture-card-size: var(--size);
    }
    .el-upload-list__item.is-success:focus:not(:hover) .el-icon--close-tip {
      display: none;
    }
  }
  @include when(limit) {
    ::v-deep(.el-upload.el-upload--picture-card) {
      display: none;
    }
  }
}
</style>

