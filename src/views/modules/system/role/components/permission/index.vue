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
      <el-form-item label="权限" prop="menuIds">
        <el-cascader
          class="w-f"
          ref="refCascader"
          v-model="form.menuIds"
          :options="menus"
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
import { useMenuStore } from '@/stores'
import { roleInfoApi, roleSetPermissionApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const menuStore = useMenuStore()

const cascaderRef = useTemplateRef('cascaderRef')
const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: false,
  value: 'value',
  label: `label`,
  children: 'children'
}
const menus = ref([])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  menuIds: []
})
const rules = computed(() => {
  return {
    menuIds: [{ type: 'array', required: true, message: '请选择权限', trigger: 'change' }]
  }
})

const getPermissions = () => {
  menus.value = [{ id: 0, label: '一级菜单', parentId: 0, children: menuStore.menus }]
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
      let menuIds = []
      checkedNodes.forEach(item => menuIds.push.apply(menuIds, item.pathValues))
      menuIds = Array.from(new Set(menuIds)).filter(item => item !== 0)
      const r = await roleSetPermissionApi({ id: form.id, menuIds })
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
  form.id = id
  getPermissions()
  roleInfoApi({ id }).then(r => {
    if (r) {
      form.name = r.data.name
      form.menuIds = r.data.menuIds
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
