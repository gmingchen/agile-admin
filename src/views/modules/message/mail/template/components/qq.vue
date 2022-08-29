<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="refForm"
    @keyup.enter="submit()"
    label-position="top">
    <el-form-item label="邮箱" prop="username">
      <el-input v-model="form.username" placeholder="邮箱" />
    </el-form-item>
    <el-form-item label="授权码" prop="password">
      <el-input v-model="form.password" placeholder="授权码" />
    </el-form-item>
    <el-form-item label="协议" prop="protocol">
      <el-input v-model="form.protocol" placeholder="协议" />
    </el-form-item>
    <el-form-item label="主机" prop="host">
      <el-input v-model="form.host" placeholder="主机" />
    </el-form-item>
    <el-form-item label="端口" prop="port">
      <el-input v-model="form.port" placeholder="端口" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onBeforeUnmount, reactive, ref, watch } from 'vue'

const emits = defineEmits(['refresh'])
const props = defineProps({
  data: {
    type: Object
  }
})

const refForm = ref()
const types = ref([])
const form = ref({
  username: '',
  password: '',
  protocol: '',
  host: '',
  port: ''
})
const rules = reactive(function() {
  return {
    username: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
    password: [{ required: true, message: '请输入授权码', trigger: 'blur' }],
    protocol: [{ required: true, message: '请输入协议', trigger: 'blur' }],
    host: [{ required: true, message: '请输入主机', trigger: 'blur' }],
    port: [{ required: true, message: '请输入端口', trigger: 'blur' }]
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
</script>
