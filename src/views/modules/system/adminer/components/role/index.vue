<template>
  <el-dialog
    v-model="visible"
    title="分配角色"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="用户名" readonly />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="昵称" readonly />
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-checkbox-group v-model="form.roleIds">
          <el-checkbox v-for="item in roles" :key="item.id" :value="item.id" :label="item.name" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { adminerInfoApi, adminerSetRoleApi, roleSelectListApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const roles = ref([])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  username: '',
  nickname: '',
  roleIds: []
})
const rules = computed(() => {
  return {
    roleIds: [{ type: 'array', min: 1, message: '请选择角色', trigger: 'change' }]
  }
})

const getRoles = async () => {
  const r = await roleSelectListApi()
  if (r) {
    roles.value = r.data
  }
}

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
      const { id, roleIds } = form
      const params = { id, roleIds }
      const r = await adminerSetRoleApi(params)
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
      loading.value = false
    }
  })
}

const open = async (id) => {
  visible.value = true
  loading.value = true
  await getRoles()
  if (id) {
    form.id = id
    await adminerInfoApi({ id }).then(r => {
      if (r) {
        form.username = r.data.username
        form.nickname = r.data.nickname
        form.roleIds = r.data.roleIds
      }
    })
  }
  nextTick(() => loading.value = false)
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: add-edit#{$element-separator};
@include b(add-edit) {}
</style>
