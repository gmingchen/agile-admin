<template>
  <div :class="n.b()">
    <Editor
      :api-key="key"
      :init="options"
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      @undo="onUndo"
      @redo="onRedo"
    />
    <Upload ref="uploadRef" accept="image/*,video/*" @success="onUploadSuccess"></Upload>
  </div>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import Upload from '../upload/index.vue'
import { useModel, MODEL_NAME, UPDATE_MODEL_EVENT } from '@/hooks'
import { key, config, registryUploadIcon, registryUploadButton } from './config.js'
import { useNamespace } from '@/hooks'

const n = useNamespace('tinymce')

const emits = defineEmits([UPDATE_MODEL_EVENT, 'input', 'focus', 'blur', 'change'])

const props = defineProps({
  [MODEL_NAME]: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: () => ''
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  readonly: {
    type: Boolean,
    default: () => false
  }
})

const value = useModel(props)

const uploadRef = useTemplateRef('uploadRef')

let editor = null
const options = {
  ...config,
  setup: el => {
    editor = el
    registryUploadIcon(el)
    registryUploadButton(el, () => {
      // 点击上传按钮，模拟点击上传文件输入框
      uploadRef.value.$refs?.uploadRef.$refs?.inputRef.click()
    })
  }
}

const onUploadSuccess = (_url, file, _files) => {
  if (file) {
    const { raw: { type }, response } = file
    if (type.startsWith('image/')) {
      editor.insertContent(`<img src="${response.data}" style="max-width: 100%" >`)
    } else if (type.startsWith('video/')) {
      editor.insertContent(`<video src="${response.data}" style="max-width: 100%" controls></video>`)
    }
  }
}

const onInput = () => {
  emits('input', value.value)
}
const onFocus = () => {
  emits('focus', value.value)
}
const onBlur = () => {
  emits('blur', value.value)
}
const onChange = () => {
  emits('change', value.value)
}
const onUndo = () => {
  emits('change', value.value)
}
const onRedo = () => {
  emits('change', value.value)
}

</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: tinymce#{$element-separator};
@include b(tinymce) {
  width: 100%;
  height: 500px;

  ::v-deep(.tox-promotion) {
    display: none;
  }
  ::v-deep(.tox-statusbar__branding) {
    display: none;
  }

  ::v-deep(.#{$prefix}iframe) {
    .p {
      background-color: red;
    }
  }
}


</style>
