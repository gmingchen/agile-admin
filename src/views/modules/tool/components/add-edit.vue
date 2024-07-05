<script setup>
import { ElMessage } from 'element-plus'

import { Status } from '@enums'

import { infoApi, createApi, updateApi } from '@/api/tool'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  name: '',
  describe: '',
  page: '',
  sort: 1,
  status: Status.ENABLE
})
const rules = reactive(function() {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    describe: [{ required: true, message: '请输入描述', trigger: 'blur' }],
    page: [{ required: true, message: '请输入页面路径', trigger: 'blur' }]
  }
}())

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await infoApi({ id })
    if (r) {
      const { name, describe, page, sort, status } = r.data
      form.name = name
      form.describe = describe
      form.page = page
      form.sort = sort
      form.status = status
    }
  }
  nextTick(() => { loading.value = false })
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 */
const submit = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      const r = form.id ? await updateApi(form) : await createApi(form)
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
 */
const dialogClosedHandle = () => {
  refForm.value.resetFields()
}

defineExpose({
  init
})
</script>

<template>
  <el-dialog
    width="500px"
    :title="form.id ? '编辑' : '新增'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="refForm"
      label-width="110px"
      @keyup.enter="submit()">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="名称"
          maxlength="10"
          show-word-limit />
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input
          v-model="form.describe"
          placeholder="描述"
          type="textarea"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="页面路径" prop="page">
        <el-input
          v-model="form.page"
          placeholder="页面路径"
          maxlength="100"
          show-word-limit />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="form.sort"
          :min="1"
          controls-position="right" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <DictRadio v-model="form.status" code="STATUS" />
      </el-form-item>
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
