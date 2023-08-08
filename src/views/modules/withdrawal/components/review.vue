<script setup>
import { ElMessage } from 'element-plus'

import UploadImage from '@/components/upload-image/index.vue'

import { ReviewStatus } from '@/utils/enum'

import { reviewApi } from '@/api/withdrawal'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  amount: '',
  payable: '',
  status: ReviewStatus.PASS,
  image: '',
  reason: '款项已付'
})
const rules = reactive(function() {
  return {
    status: [{ required: true, message: '请选择审核状态', trigger: 'blur' }],
    image: [{ required: true, message: '请上传图片', trigger: 'change' }],
    reason: [{ required: true, message: '请输入审核原因', trigger: 'blur' }]
  }
}())

const init = ({ id, amount, payable }) => {
  visible.value = true
  loading.value = true
  form.id = id
  form.amount = amount
  form.payable = payable
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
      const { id, status, image, reason } = form
      const params = { id, status, image: [image], reason }
      const r = await reviewApi(params)
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
    title="审核"
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
      label-width="80px"
      @keyup.enter="submit()">
      <el-form-item label="金额">
        <el-input v-model="form.amount" placeholder="金额" readonly />
      </el-form-item>
      <el-form-item label="收款码">
        <el-image
          class="height-100 width-100"
          fit="cover"
          :src="form.payable"
          preview-teleported
          :preview-src-list="[form.payable]" />
      </el-form-item>
      <el-form-item label="审核状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="ReviewStatus.PASS">通过</el-radio>
          <el-radio :label="ReviewStatus.REJECT">驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核图片" prop="image">
        <UploadImage v-model="form.image" />
      </el-form-item>
      <el-form-item label="审核原因" prop="reason">
        <el-input
          v-model="form.reason"
          placeholder="审核原因"
          type="textarea"
          maxlength="200"
          show-word-limit />
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
