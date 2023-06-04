<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import { toolOptions, editorOptions } from './config.js'

import useModel from '@/hooks/model'
import { UPDATE_MODEL_EVENT, AUTH_KEY } from '@/utils/constant'

const emits = defineEmits([UPDATE_MODEL_EVENT, 'created', 'change', 'focus', 'blur', 'destroyed'])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  placeholder: {
    type: [String, Number],
    default: ''
  },
  maxLength: {
    type: Number,
    default: () => null
  },
  readOnly: {
    type: Boolean,
    default: () => false
  },
  autoFocus: {
    type: Boolean,
    default: () => false
  },
  height: {
    type: String,
    default: '300px'
  },
  options: {
    type: Object,
    default: () => {
      return { toolOptions, editorOptions }
    }
  }
})

const authStore = useAuthStore()
const editorRef = shallowRef()

const value = useModel(props)

/**
 * 长度超过最大限制
 */
const maxHandle = () => {
  emits('max', value.value)
}

const config = ref({
  toolOptions: props.options.toolOptions,
  editorOptions: {
    ...editorOptions,
    ...props.options.editorOptions,
    placeholder: props.placeholder,
    maxLength: props.maxLength,
    readOnly: props.readOnly,
    autoFocus: props.autoFocus,
    onMaxLength: maxHandle,
    MENU_CONF: {
      ...editorOptions.MENU_CONF,
      ...props.options.editorOptions.MENU_CONF,
      uploadImage: {
        ...editorOptions.MENU_CONF.uploadImage,
        ...props.options.editorOptions.MENU_CONF.uploadImage,
        headers: {
          [AUTH_KEY]: authStore.token
        }
      },
      uploadVideo: {
        ...editorOptions.MENU_CONF.uploadVideo,
        ...props.options.editorOptions.MENU_CONF.uploadVideo,
        headers: {
          [AUTH_KEY]: authStore.token
        }
      }
    }
  }
})

/**
 * 编辑器创建完毕
 * @param {*} editor
 */
const createdHandle = (editor) => {
  editorRef.value = editor
  emits('created')
}
/**
 * 内容变化
 */
const changeHandle = () => {
  emits('change', value.value)
}
/**
 * 编辑器获得焦点
 */
const focusHandle = () => {
  emits('focus', value.value)
}
/**
 * 编辑器获得失去焦点
 */
const blurHandle = () => {
  emits('blur', value.value)
}
/**
 * 编辑器销毁
 */
const destroyedHandle = () => {
  emits('destroyed', value.value)
}

// 组件销毁时，销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

</script>

<template>
  <div class="wang-container width-full">
    <Toolbar
      class="toolbar"
      :editor="editorRef"
      :defaultConfig="config.toolOptions" />
    <Editor
      class="editor"
      :style="{ height: height }"
      v-model="value"
      :defaultConfig="config.editorOptions"
      @onCreated="createdHandle"
      @onChange="changeHandle"
      @onFocus="focusHandle"
      @onBlur="blurHandle"
      @onDestroyed="destroyedHandle" />
  </div>
</template>

<style lang="scss" scoped>
.wang-container {
  border: 1px solid var(--el-border-color);
  .toolbar {
    border-bottom: 1px solid var(--el-border-color);
  }
  .editor {
    // height: 500px !important;
    overflow-y: hidden;
    ::v-deep(.w-e-text-placeholder) {
      top: 11px !important;
    }
  }
}
</style>
