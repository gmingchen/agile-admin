<template>
  <div class="quill-container">
    <div ref="refToolbar" class="toolbar">
      <!-- 加粗 -->
      <button class="ql-bold" />
      <!-- 斜体 -->
      <button class="ql-italic" />
      <!-- 中横线 -->
      <button class="ql-strike" />
      <!-- 加粗 -->
      <button class="ql-underline" />
      <!-- 下横线 -->
      <select class="ql-font" />
      <!-- 字体大小 -->
      <select class="ql-size" />
      <!-- 字体颜色 -->
      <select class="ql-color" />
      <!-- 背景色 -->
      <select class="ql-background" />
      <!-- 脚本位置 -->
      <button class="ql-script" value="sub" />
      <button class="ql-script" value="super" />
      <!-- H标签 -->
      <select class="ql-header">
        <option v-for="item in 6" :key="item" :value="item">H{{ item }}</option>
      </select>
      <!-- 行缩进 -->
      <button class="ql-indent" value="-1" />
      <button class="ql-indent" value="+1" />
      <!-- 居中方式 -->
      <select class="ql-align" />
      <!-- 块引用 -->
      <button class="ql-blockquote" />
      <!-- 列表 -->
      <button class="ql-list" value="ordered" />
      <button class="ql-list" value="bullet" />
      <!-- 方向 -->
      <button class="ql-direction" value="rtl" />
      <!-- 代码块 -->
      <!-- <button class="ql-code-block" /> -->
      <!-- 超链接 -->
      <button class="ql-link" />
      <!-- 公式 -->
      <!-- <button class="ql-formula" /> -->
      <!-- 上传图片 -->
      <button class="ql-image" />
      <!-- 上传视频 -->
      <button class="ql-video" />
      <!-- 自定义按钮 -->
      <slot name="toolbar" />
      <!-- 清除 -->
      <button class="ql-clean" />
    </div>
    <div ref="refQuill">
      <div v-html="content" />
    </div>
    {{content}}
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRefs, nextTick, computed } from 'vue'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import * as Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { handlers, delta2Html } from './config'

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: [String, Number],
      default: '请输入...'
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, { emit }) {
    const refQuill = ref()
    const refToolbar = ref()
    const data = reactive({
      quill: null,
      options: {
        debug: 'warn',
        theme: 'snow', // 主题 snow / bubble
        placeholder: '请输入...',
        readOnly: false,
        modules: {
          toolbar: {
            container: null,
            handlers: handlers
          }
        }
      }
    })

    const content = computed({
      get: () => {
        return props.modelValue
      },
      set: (val) => {
        emit(UPDATE_MODEL_EVENT, val)
      }
    })

    /**
     * 初始化参数
     */
    const initOptions = () => {
      data.options.modules.toolbar.container = refToolbar.value
      data.options.placeholder = props.placeholder
      data.options.readOnly = props.readOnly
    }

    /**
     * 初始化
     */
    const init = () => {
      initOptions()
      data.quill = new Quill(refQuill.value, data.options)
      data.quill.on('text-change', () => {
        content.value = delta2Html(data.quill.getContents())
      })
    }

    /**
     * 对内容中的<, >, /, ', ", &个字符进行编码
     */
    const getEncodeHtml = () => {
      return encodeURI(content.value)
    }

    onMounted(() => {
      nextTick(() => {
        init()
      })
    })

    return {
      refQuill,
      refToolbar,
      ...toRefs(data),
      content,
      getEncodeHtml
    }
  }
})
</script>

<style lang="scss" scoped>
.quill-container{
  .toolbar {
    svg {
      height: 22px!important;
    }
  }
  ::v-deep(.ql-formats) {
    margin-right: 0!important;
  }
  ::v-deep(.ql-font), ::v-deep(.ql-size), ::v-deep(.ql-header) {
    width: unset;
    .ql-picker-label {
      padding-right: 16px;
    }
  }
}

</style>
