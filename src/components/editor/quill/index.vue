<template>
  <div id="quill" ref="refQuill" />
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRefs, nextTick } from 'vue'
import * as Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import options from './config'

export default defineComponent({
  setup(props) {
    const refQuill = ref()
    const data = reactive({
      quill: null,
      content: ''
    })
    const test = () => {
      console.log(JSON.stringify(data.content))
    }

    onMounted(() => {
      nextTick(() => {
        data.quill = new Quill(document.getElementById('quill'), options)
        console.log('ready')
      })
    })
    return {
      refQuill,
      ...toRefs(data),
      options,
      test
    }
  }
})
</script>

<style>

</style>
