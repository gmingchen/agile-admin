<template>
  <el-dialog
    v-model="visible"
    title="设置权限"
    :close-on-click-modal="false"
    width="450px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" readonly />
      </el-form-item>
      <el-form-item label="权限" prop="permissionIds">
        <el-cascader
          class="w-f"
          ref="cascaderRef"
          v-model="form.permissionIds"
          :options="permissions"
          :props="cascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { usePermissionStore } from '@/stores'
import { roleInfoApi, roleSetPermissionApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const permissionStore = usePermissionStore()

const cascaderRef = useTemplateRef('cascaderRef')
const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: false,
  value: 'value',
  label: `label`,
  children: 'children'
}
const permissions = ref([])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  permissionIds: []
})
const rules = computed(() => {
  return {
    permissionIds: [{ type: 'array', required: true, message: '请选择权限', trigger: 'change' }]
  }
})

const getPermissions = () => {
  permissions.value = [{ id: 0, label: '一级菜单', parentId: 0, children: permissionStore.permissions }]
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
      const checkedNodes = cascaderRef.value.getCheckedNodes(true)
      let permissionIds = []
      checkedNodes.forEach(item => permissionIds.push.apply(permissionIds, item.pathValues))
      permissionIds = Array.from(new Set(permissionIds)).filter(item => item !== 0 && item)
      const r = await roleSetPermissionApi({ id: form.id, permissionIds })
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
      loading.value = false
    }
  })
}

const open = (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  getPermissions()
  roleInfoApi({ id }).then(r => {
    if (r) {
      form.name = r.data.name
      form.permissionIds = r.data.permissionIds
    }
    nextTick(() => loading.value = false)
  })
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: add-edit#{$element-separator};
@include b(add-edit) {}
</style>
