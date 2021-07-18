<template>
  <div>
    <div id="toolbar">
      <!-- Add font size dropdown -->
      <select class="ql-size">
        <option value="small" />
        <option value="large" />
        <option value="huge" />
      </select>
      <!-- Add a bold button -->
      <button class="ql-bold" />
      <!-- Add subscript and superscript buttons -->
      <button class="ql-script" value="sub" />
      <button class="ql-script" value="super" />
    </div>
    <div ref="refQuill">
      <div v-html="content" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRefs, nextTick, watch, computed } from 'vue'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import * as Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import options from './config'

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, { emit }) {
    const refQuill = ref()
    const data = reactive({
      quill: null
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
     * 初始化
     */
    const init = () => {
      Quill.prototype.getHtml = function() {
        return this.container.firstChild.innerHTML
      }
      data.quill = new Quill(refQuill.value, options)
      console.log(data.quill)
      data.quill.on('text-change', () => {
        content.value = data.quill.root.innerHTML
      })
    }

    onMounted(() => {
      nextTick(() => {
        init()
      })
    })
    return {
      refQuill,
      ...toRefs(data),
      content
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.ql-formats) {
  margin-right: 0!important;
}
</style>
