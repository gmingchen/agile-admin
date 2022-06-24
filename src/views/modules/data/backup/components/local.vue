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
    <el-form-item label="安装目录" prop="location">
      <el-input v-model="form.location" placeholder="安装目录" />
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
        path: '',
        location: ''
      }
    })

    const rules = reactive(function() {
      return {
        domain: [{ required: true, message: '请输入域名', trigger: 'blur' }],
        path: [{ required: true, message: '请输入存储目录', trigger: 'blur' }],
        location: [{ required: true, message: '请输入安装目录', trigger: 'blur' }]
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
