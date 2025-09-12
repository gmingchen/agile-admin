<template>
  <el-dialog
    v-model="visible"
    title="设置数据权限"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" readonly />
      </el-form-item>
      <el-form-item label="数据范围" prop="dataScope">
        <Dict v-model="form.dataScope" :code="DICT_CODE_ENUM.DATA_PERMISSION" default-value></Dict>
      </el-form-item>
      <el-form-item label="部门" prop="dataScopeDeptIds" v-show="form.dataScope === DATA_PERMISSION_ENUM.CUSTOM">
        <el-cascader
          class="width-full"
          ref="refCascader"
          v-model="form.dataScopeDeptIds"
          :options="depts"
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
import { Dict } from '@/components'
import { DICT_CODE_ENUM, STATUS_ENUM, DATA_PERMISSION_ENUM } from '@/common/enums'
import { parseDataToTree } from '@/common/utils'
import { deptInfoApi, deptSetDataPermissionApi, deptSelectListApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: true,
  value: 'id',
  label: `name`,
  children: 'children'
}

const depts = ref([])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  dataScope: '',
  dataScopeDeptIds: []
})
const rules = computed(() => {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }]
  }
})

const getDepts = async () => {
  const r = await deptSelectListApi({ status: STATUS_ENUM.ENABLE })
  if (r) {
    depts.value = parseDataToTree(r.data)
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
      const params = {
        id: form.id,
        dataScope: form.dataScope,
        dataScopeDeptIds: form.dataScope === DATA_PERMISSION_ENUM.CUSTOM ? form.dataScopeDeptIds : null
      }
      const r = await deptSetDataPermissionApi(params)
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
  getDepts()
  if (id) {
    loading.value = true
    form.id = id
    deptInfoApi({ id }).then(r => {
      if (r) {
        form.name = r.data.name
        form.dataScope = r.data.dataScope
        form.dataScopeDeptIds = r.data.dataScopeDeptIds
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
