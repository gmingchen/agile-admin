<!--
* @Description: 数据源
* @Author: 拖孩
* @Email: 1240235512@qq.com
* @Date: 2023-06-16 11:22:49
-->
<script setup>
import { ElMessage } from 'element-plus'

import { Status } from '@/utils/enum'

import { infoApi, createApi, updateApi } from '@/api/data-source'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  name: '',
  code: '',
  driverClassName: '',
  url: '',
  username: '',
  password: '',
  status: Status.ENABLE
})
const rules = reactive(function() {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
    driverClassName: [{ required: true, message: '请输入驱动名称', trigger: 'blur' }],
    url: [{ required: true, message: '请输入连接', trigger: 'blur' }],
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }
}())

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await infoApi({ id })
    if (r) {
      const { name, code, driverClassName, url, username, password, status } = r.data
      form.name = name
      form.code = code
      form.driverClassName = driverClassName
      form.url = url
      form.username = username
      form.password = password
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
  console.log(encodeURIComponent('jdbc:mysql://139.196.182.46:3306/agile-admin-dev?allowMultiQueries=true&useUnicode=true&characterEncoding=UTF-8&useSSL=false'))
  refForm.value.validate(async valid => {
    if (valid) {
      const params = { ...form, url: encodeURIComponent(form.url) }
      const r = form.id ? await updateApi(params) : await createApi(params)
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
      <el-form-item label="编码" prop="code">
        <el-input
          v-model="form.code"
          placeholder="编码"
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <el-form-item label="驱动名称" prop="driverClassName">
        <el-input v-model="form.driverClassName" placeholder="驱动名称" />
      </el-form-item>
      <el-form-item label="连接" prop="url">
        <el-input
          v-model="form.url"
          placeholder="连接"
          type="textarea"
          maxlength="200"
          show-word-limit />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="form.username"
          placeholder="用户名"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          maxlength="50"
          show-word-limit />
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
