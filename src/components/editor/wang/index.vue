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

<script>
import { defineComponent, ref, shallowRef, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import { toolOptions, editorOptions } from './config.js'

import useModel from '@/mixins/model'
import { UPDATE_MODEL_EVENT, TOKEN_KEY } from '@/utils/constant'

export default defineComponent({
  components: { Editor, Toolbar },
  emits: [UPDATE_MODEL_EVENT, 'created', 'change', 'focus', 'blur', 'destroyed'],
  props: {
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
  },
  setup(props, { emit }) {
    const store = useStore()
    const editorRef = shallowRef()

    const value = useModel(props)

    /**
     * 长度超过最大限制
     */
    const maxHandle = () => {
      emit('max', value.value)
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
              [TOKEN_KEY]: store.getters['administrator/tokenVal']
            }
          },
          uploadVideo: {
            ...editorOptions.MENU_CONF.uploadVideo,
            ...props.options.editorOptions.MENU_CONF.uploadVideo,
            headers: {
              [TOKEN_KEY]: store.getters['administrator/tokenVal']
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
      emit('created')
    }
    /**
     * 内容变化
     */
    const changeHandle = () => {
      emit('change', value.value)
    }
    /**
     * 编辑器获得焦点
     */
    const focusHandle = () => {
      emit('focus', value.value)
    }
    /**
     * 编辑器获得失去焦点
     */
    const blurHandle = () => {
      emit('blur', value.value)
    }
    /**
     * 编辑器销毁
     */
    const destroyedHandle = () => {
      emit('destroyed', value.value)
    }

    // 组件销毁时，销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    return {
      editorRef,
      value,
      config,
      createdHandle,
      changeHandle,
      focusHandle,
      blurHandle,
      destroyedHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.wang-container {
  border: 1px solid var(--el-border-color);
  .toolbar {
    border-bottom: 1px solid var(--el-border-color);
  }
  .editor {
    // height: 500px !important;
    overflow-y: hidden;
  }
}
</style>
