<template>
  <quill-editor v-model:content="content" :options="options" />
  <el-button @click="test">console</el-button>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import options from './config'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default defineComponent({
  components: { QuillEditor },
  setup(props) {
    const data = reactive({
      content: ''
    })
    const test = () => {
      console.log(JSON.stringify(data.content))
    }
    return {
      ...toRefs(data),
      options,
      test
    }
  }
})
</script>

<style>

</style>
