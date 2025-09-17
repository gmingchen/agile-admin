<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑套餐' : '新增套餐'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="32" show-word-limit />
      </el-form-item>
      <el-form-item label="权限" prop="permissionIds">
        <el-cascader
          class="w-f"
          ref="cascaderRef"
          v-model="form.permissionIds"
          :options="permissionList"
          :props="cascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <Dict v-model="form.status" :code="DICT_CODE_ENUM.STATUS" default-value></Dict>
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
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { Dict } from '@/components'
import { DICT_CODE_ENUM } from '@/common/enums'
import { parseDataToTree } from '@/common/utils'
import { packageInfoApi, packageCreateApi, packageUpdateApi, permissionSelectListApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  remark: '',
  status: '',
  permissionIds: []
})
const rules = computed(() => {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    permissionIds: [{ type: 'array', required: true, message: '请选择菜单', trigger: 'change' }]
  }
})

const cascaderRef = useTemplateRef('cascaderRef')
const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: false,
  value: 'id',
  label: `name`,
  children: 'children'
}
const permissionList = ref([])

const getPermissionList = async () => {
  const r = await permissionSelectListApi()
  if (r) {
    const list = [{ id: 0, name: '一级菜单', parentId: 0, children: parseDataToTree(r.data) }]
    permissionList.value = list
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
       // 获取所有菜单ID
      const checkedNodes = cascaderRef.value.getCheckedNodes(true)
      const permissionIds = []
      checkedNodes.forEach(item => {
        permissionIds.push.apply(permissionIds, item.pathValues)
      })
      form.permissionIds = Array.from(new Set(permissionIds)).filter(item => item !== 0 && item)
      const r = await (form.id ? packageUpdateApi(form) : packageCreateApi(form))
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
  if (!permissionList.value.length) {
    await getPermissionList()
  }
  if (id) {
    form.id = id
    await packageInfoApi({ id }).then(r => {
      if (r) {
        form.name = r.data.name
        form.remark = r.data.remark
        form.status = r.data.status
        form.permissionIds = r.data.permissionIds
      }
    })
  }
  nextTick(() => loading.value = false)
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: sidebar#{$element-separator};
@include b(add-edit) {}
</style>
