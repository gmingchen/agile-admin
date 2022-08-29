<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="refForm"
    @keyup.enter="submit()"
    label-position="top">
    <el-form-item label="域名" prop="domain">
      <el-input v-model="form.domain" placeholder="域名" />
    </el-form-item>
    <el-form-item label="前缀" prop="prefix">
      <el-input v-model="form.prefix" placeholder="前缀" />
    </el-form-item>
    <el-form-item label="存储目录" prop="path">
      <el-input v-model="form.path" placeholder="存储目录" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onBeforeUnmount, reactive, ref, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object
  }
})

const refForm = ref()
const types = ref([])
const form = ref({
  domain: '',
  prefix: '',
  path: ''
})
const rules = reactive(function() {
  return {
    domain: [{ required: true, message: '请输入域名', trigger: 'blur' }],
    path: [{ required: true, message: '请输入存储目录', trigger: 'blur' }]
  }
}())

watch(props.data, (newVal) => {
  form.value = {
    ...newVal
  }
}, { deep: true, immediate: true })

const validate = (fn) => {
  refForm.value.validate(valid => {
    if (typeof fn === 'function') {
      fn(valid, form.value)
    }
  })
}

onBeforeUnmount(() => {
  refForm.value.resetFields()
})

defineExpose({
  validate
})
</script>
