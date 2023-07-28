<!--
* @Description: 微信小程序
* @Author: 拖孩
* @Email: 1240235512@qq.com
* @Date: 2023-07-26 21:48:09
-->
<script setup>
import { ElMessage } from 'element-plus'

import { infoApi, createApi, updateApi } from '@/api/wechat-applet'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  name: '',
  originalId: '',
  appId: '',
  secret: '',
  pushUrl: '',
  pushToken: '',
  pushKey: ''
})
const rules = reactive(function() {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    originalId: [{ required: true, message: '请输入原始ID', trigger: 'blur' }],
    appId: [{ required: true, message: '请输入AppID', trigger: 'blur' }],
    secret: [{ required: true, message: '请输入密钥', trigger: 'blur' }]
  }
}())

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await infoApi({ id })
    if (r) {
      const { name, originalId, appId, secret, pushUrl, pushToken, pushKey } = r.data
      form.name = name
      form.originalId = originalId
      form.appId = appId
      form.secret = secret
      form.pushUrl = pushUrl
      form.pushToken = pushToken
      form.pushKey = pushKey
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
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <el-form-item label="原始ID" prop="originalId">
        <el-input
          v-model="form.originalId"
          placeholder="原始ID"
          maxlength="100" />
      </el-form-item>
      <el-form-item label="AppID" prop="appId">
        <el-input
          v-model="form.appId"
          placeholder="AppID"
          maxlength="100" />
      </el-form-item>
      <el-form-item label="密钥" prop="secret">
        <el-input
          v-model="form.secret"
          placeholder="密钥"
          maxlength="100"  />
      </el-form-item>
      <el-form-item label="消息推送URL" prop="pushUrl">
        <el-input
          v-model="form.pushUrl"
          placeholder="消息推送URL"
          maxlength="100"  />
      </el-form-item>
      <el-form-item label="消息推送Token" prop="pushToken">
        <el-input
          v-model="form.pushToken"
          placeholder="消息推送Token" />
      </el-form-item>
      <el-form-item label="消息推送密钥" prop="pushKey">
        <el-input
          v-model="form.pushKey"
          placeholder="消息推送密钥" />
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
