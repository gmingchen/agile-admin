<template>
  <el-dialog
    width="450px"
    :title="form.id ? '编辑' : '新增'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable
    destroy-on-close>
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="refForm"
      label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="名称"
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <Collapse inactive-text="展开（非必填项）">
        <template #default>
          <el-form-item label="Logo" prop="logo">
            <ImageUploadSingle v-model="form.logo" />
          </el-form-item>
          <el-form-item label="描述" prop="describe">
            <el-input
              v-model="form.describe"
              type="textarea"
              placeholder="描述"
              maxlength="200"
              show-word-limit />
          </el-form-item>
        </template>
      </Collapse>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          v-repeat
          type="primary"
          @click="submit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'
import Collapse from '@/components/collapse/index.vue'
import ImageUploadSingle from '@/components/image-upload-single/index.vue'

import { infoApi, addApi, editApi } from '@/api/enterprise'

const emits = defineEmits(['refresh'])

const refForm = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  id: null,
  name: '',
  logo: '',
  describe: ''
})
const roles = ref([])
const rules = reactive(function() {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
  }
}())

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await infoApi(id)
    if (r) {
      form.name = r.data.name
      form.logo = r.data.logo
      form.describe = r.data.describe
    }
  }
  nextTick(() => { loading.value = false })
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const submit = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      const r = form.id ? await editApi(form) : await addApi(form)
      if (r) {
        visible.value = false
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        emits('refresh')
      }
    }
  })
}

/**
 * @description: 弹窗关闭动画结束时的回调
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const dialogClosedHandle = () => {
  refForm.value.resetFields()
}

defineExpose({
  init
})
</script>
