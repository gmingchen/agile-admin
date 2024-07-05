<script setup>
import { ElMessage } from 'element-plus'

import { Whether } from '@enums'

import { infoApi, createApi, updateApi } from '@/api/mail-account'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  mail: '',
  username: '',
  password: '',
  protocol: '',
  host: '',
  port: '',
  ssl: Whether.NO,
  master: Whether.NO
})
const rules = reactive(function() {
  return {
    mail: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }],
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    protocol: [{ required: true, message: '请输入协议', trigger: 'blur' }],
    host: [{ required: true, message: '请输入主机', trigger: 'blur' }],
    port: [{ required: true, message: '请输入端口', trigger: 'blur' }],
    ssl: [{ required: true, message: '请选择是否开启ssl', trigger: 'blur' }],
    master: [{ required: true, message: '请选择是否是主配置', trigger: 'blur' }]
  }
}())

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await infoApi({ id })
    if (r) {
      const { mail, username, password, protocol, host, port, ssl, master } = r.data
      form.mail = mail
      form.username = username
      form.password = password
      form.protocol = protocol
      form.host = host
      form.port = port
      form.ssl = ssl
      form.master = master
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
      <el-form-item label="邮箱地址" prop="mail">
        <el-input v-model="form.mail" placeholder="邮箱地址" maxlength="100" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="用户名" maxlength="100" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="密码" maxlength="100" />
      </el-form-item>
      <el-form-item label="协议" prop="protocol">
        <el-input v-model="form.protocol" placeholder="协议" maxlength="100" />
      </el-form-item>
      <el-form-item label="主机" prop="host">
        <el-input v-model="form.host" placeholder="主机" maxlength="100" />
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="form.port" placeholder="端口" maxlength="100"  />
      </el-form-item>
      <el-form-item label="是否开启SSL" prop="SSL">
        <DictRadio v-model="form.ssl" code="WHETHER" />
      </el-form-item>
      <el-form-item label="是否是主配置" prop="master">
        <DictRadio v-model="form.master" code="WHETHER" />
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
