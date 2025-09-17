<template>
  <div :class="n.b()">
    <Toolbar
      :class="n.e('toolbar')"
      :editor="editorRef"
      :defaultConfig="config.toolOptions" />
    <Editor
      :class="n.e('editor')"
      :style="{ height: height }"
      v-model="value"
      :defaultConfig="config.editorOptions"
      @onCreated="onCreated"
      @onChange="onChange"
      @onFocus="onFocus"
      @onBlur="onBlur"
      @onDestroyed="onDestroyed" />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { toolOptions, editorOptions } from './config.js'
import { useAuthStore } from '@/stores'
import { TOKEN_KEY } from '@/apis'
import { useNamespace, useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks'

const emits = defineEmits([UPDATE_MODEL_EVENT, 'created', 'change', 'focus', 'blur', 'destroyed'])

const props = defineProps({
  [MODEL_NAME]: {
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

const n = useNamespace('wang-editor')


const authStore = useAuthStore()
const editorRef = shallowRef()

const value = useModel(props)

/**
 * 长度超过最大限制
 */
const onExceed = () => {
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
    onMaxLength: onExceed,
    MENU_CONF: {
      ...editorOptions.MENU_CONF,
      ...props.options.editorOptions.MENU_CONF,
      uploadImage: {
        ...editorOptions.MENU_CONF.uploadImage,
        ...props.options.editorOptions.MENU_CONF.uploadImage,
        headers: {
          [TOKEN_KEY]: authStore.token
        }
      },
      uploadVideo: {
        ...editorOptions.MENU_CONF.uploadVideo,
        ...props.options.editorOptions.MENU_CONF.uploadVideo,
        headers: {
          [TOKEN_KEY]: authStore.token
        }
      }
    }
  }
})

/**
 * 编辑器创建完毕
 * @param {*} editor
 */
const onCreated = (editor) => {
  editorRef.value = editor
  emits('created')
}
/**
 * 内容变化
 */
const onChange = () => {
  emits('change', value.value)
}
/**
 * 编辑器获得焦点
 */
const onFocus = () => {
  emits('focus', value.value)
}
/**
 * 编辑器获得失去焦点
 */
const onBlur = () => {
  emits('blur', value.value)
}
/**
 * 编辑器销毁
 */
const onDestroyed = () => {
  emits('destroyed', value.value)
}

// 组件销毁时，销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: wang-editor#{$element-separator};
@include b(wang-editor) {
  width: 100%;
  border: 1px solid var(--el-border-color);
  @include e(toolbar) {
    border-bottom: 1px solid var(--el-border-color);
  }
  @include e(editor) {
    overflow-y: hidden;
    ::v-deep(.w-e-text-placeholder) {
      top: 11px !important;
    }
  }
}
</style>
