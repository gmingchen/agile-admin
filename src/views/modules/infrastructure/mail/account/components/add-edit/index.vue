<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑邮箱账号' : '新增邮箱账号'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
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
      <el-form-item label="是否开启SSL" prop="ssl">
        <Dict v-model="form.ssl" :code="DICT_CODE_ENUM.WHETHER" default-value></Dict>
      </el-form-item>
      <el-form-item label="是否是主配置" prop="master">
        <Dict v-model="form.master" :code="DICT_CODE_ENUM.WHETHER" default-value></Dict>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { Dict } from '@/components'
import { DICT_CODE_ENUM } from '@/common/enums'
import { mailAccountInfoApi, mailAccountCreateApi, mailAccountUpdateApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  mail: '',
  username: '',
  password: '',
  protocol: '',
  host: '',
  port: '',
  ssl:'',
  master:'',
})
const rules = computed(() => {
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
})

const onClosed = () => {
  form.id = null
  formRef.value.resetFields()
}

const onCancel = () => {
  visible.value = false
  emits('cancel')
}

const onConfirm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      loading.value = true
      const r = await (form.id ? mailAccountUpdateApi(form) : mailAccountCreateApi(form))
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
    }
  })
}

const open = (id) => {
  visible.value = true
  if (id) {
    loading.value = true
    form.id = id
    mailAccountInfoApi({ id }).then(r => {
      if (r) {
        form.mail = r.data.mail
        form.username = r.data.username
        form.password = r.data.password
        form.protocol = r.data.protocol
        form.host = r.data.host
        form.port = r.data.port
        form.ssl = r.data.ssl
        form.master = r.data.master
      }
      nextTick(() => loading.value = false)
    })
  }
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: add-edit#{$element-separator};
@include b(add-edit) {}
</style>
