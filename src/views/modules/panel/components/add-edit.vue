<script setup>
import { ElMessage } from 'element-plus'

import { Status } from '@/utils/enum'

import { infoApi, createApi, updateApi } from '@/api/panel'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  title: '',
  describe: '',
  param: '',
  quantity: '',
  sort: '',
  type: 1,
  platform: 1,
  status: Status.ENABLE
})
const rules = reactive(function() {
  return {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    describe: [{ required: true, message: '请输入描述', trigger: 'blur' }],
    param: [{ required: true, message: '请输入物料ID', trigger: 'blur' }],
    quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }],
    sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
  }
}())

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await infoApi({ id })
    if (r) {
      const { title, describe, param, key, quantity, sort, type, platform, status } = r.data
      form.title = title
      form.describe = describe
      form.param = param
      form.key = key
      form.quantity = quantity
      form.sort = sort
      form.type = type
      form.platform = platform
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
      label-width="70px"
      @keyup.enter="submit()">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="form.title"
          placeholder="标题"
          maxlength="10"
          show-word-limit />
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input
          v-model="form.describe"
          placeholder="描述"
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <el-form-item label="物料ID" prop="param">
        <el-input
          v-model="form.param"
          placeholder="物料ID"
          maxlength="10" />
      </el-form-item>
      <el-form-item label="数量" prop="quantity">
        <el-input-number
          v-model="form.quantity"
          :min="1"
          :max="20"
          controls-position="right" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="form.sort"
          :min="1"
          controls-position="right" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <DictRadio v-model="form.type" code="PANEL" />
      </el-form-item>
      <el-form-item label="平台" prop="platform">
        <DictRadio v-model="form.platform" code="PLATFORM" />
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
