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
    <el-form-item label="AccessKey" prop="access">
      <el-input v-model="form.access" placeholder="AccessKey" />
    </el-form-item>
    <el-form-item label="SecretKey" prop="secret">
      <el-input v-model="form.secret" placeholder="SecretKey" />
    </el-form-item>
    <el-form-item label="空间名称" prop="bucket">
      <el-input v-model="form.bucket" placeholder="空间名称" />
    </el-form-item>
    <el-form-item label="临时文件目录" prop="temp">
      <el-input v-model="form.temp" placeholder="临时文件目录" />
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, onBeforeUnmount, reactive, ref, toRefs, watch } from 'vue'

export default defineComponent({
  emits: ['refresh'],
  props: {
    data: {
      type: Object
    }
  },
  setup(props) {
    const refForm = ref()

    const data = reactive({
      types: [],
      form: {
        domain: '',
        prefix: '',
        access: '',
        bucket: '',
        temp: ''
      }
    })

    const rules = reactive(function() {
      return {
        domain: [{ required: true, message: '请输入域名', trigger: 'blur' }],
        access: [{ required: true, message: '请输入秘钥', trigger: 'blur' }],
        secret: [{ required: true, message: '请输入私钥', trigger: 'blur' }],
        bucket: [{ required: true, message: '请输入空间名称', trigger: 'blur' }]
      }
    }())

    watch(props.data, (newVal) => {
      data.form = {
        ...newVal
      }
    }, { deep: true, immediate: true })

    const validate = (fn) => {
      refForm.value.validate(valid => {
        if (typeof fn === 'function') {
          fn(valid, data.form)
        }
      })
    }

    onBeforeUnmount(() => {
      refForm.value.resetFields()
    })

    return {
      refForm,
      ...toRefs(data),
      rules,
      validate
    }
  }
})
</script>
