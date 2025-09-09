<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑数据源' : '新增数据源'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="20" show-word-limit />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="form.code" placeholder="编码" maxlength="20" show-word-limit />
      </el-form-item>
      <el-form-item label="驱动名称" prop="driverClassName">
        <el-input v-model="form.driverClassName" placeholder="驱动名称" />
      </el-form-item>
      <el-form-item label="连接" prop="url">
        <el-input v-model="form.url" placeholder="连接" type="textarea" maxlength="200" show-word-limit />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="用户名" maxlength="50" show-word-limit />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="密码" maxlength="50" show-word-limit />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <Dict v-model="form.status" :code="DICT_CODE_ENUM.STATUS" default-value></Dict>
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
import { dataSourceInfoApi, dataSourceCreateApi, dataSourceUpdateApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  code: '',
  driverClassName: '',
  url: '',
  username: '',
  password: '',
  status: ''
})
const rules = computed(() => {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
    driverClassName: [{ required: true, message: '请输入驱动名称', trigger: 'blur' }],
    url: [{ required: true, message: '请输入连接', trigger: 'blur' }],
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
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
      const r = await (form.id ? dataSourceUpdateApi(form) : dataSourceCreateApi(form))
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
    dataSourceInfoApi({ id }).then(r => {
      if (r) {
        form.name = r.data.name
        form.code = r.data.code
        form.driverClassName = r.data.driverClassName
        form.url = r.data.url
        form.username = r.data.username
        form.password = r.data.password
        form.status = r.data.status
      }
      nextTick(() => loading.value = false)
    })
  }
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: data-source#{$element-separator};
@include b(add-edit) {}
</style>
