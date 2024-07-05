<script setup>
import { ElMessage } from 'element-plus'

import { createApi } from '@/api/integral'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  nickname: '',
  userId: '',
  value: 1,
  remark: ''
})
const rules = reactive(function() {
  const checkValue = (_rule, value, callback) => {
    if (+value === 0) {
      callback(new Error('请输入不等于0的数'))
    } else {
      callback()
    }
  }
  return {
    value: [
      { required: true, message: '请输入积分数', trigger: 'blur' },
      { validator: checkValue, trigger: 'blur' }
    ]
  }
}())

const init = ({ id, nickname }) => {
  visible.value = true
  form.nickname = nickname
  form.userId = id
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
      const r = await createApi(form)
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
    title="积分奖惩"
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
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model="form.nickname"
          placeholder="用户昵称"
          readonly />
      </el-form-item>
      <el-form-item label="积分数" prop="value">
        <el-input-number v-model="form.value" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="备注"
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
