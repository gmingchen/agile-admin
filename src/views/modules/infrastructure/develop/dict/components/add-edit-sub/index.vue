<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑字典项' : '新增字典项'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="编码" prop="code">
        <el-input-number v-model="form.code" controls-position="right" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="32" show-word-limit />
      </el-form-item>
      <el-form-item label="元素颜色类型" prop="elType">
        <el-input v-model="form.elType" placeholder="元素颜色类型" maxlength="50" />
      </el-form-item>
      <el-form-item label="元素CssClass" prop="elClass">
        <el-input v-model="form.elClass" placeholder="元素CssClass" maxlength="50" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="1" controls-position="right" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <Dict v-model="form.status" :code="DICT_CODE_ENUM.STATUS" default-value></Dict>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注" maxlength="200" type="textarea" show-word-limit />
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
import { dictSubInfoApi, dictSubCreateApi, dictSubUpdateApi } from '@/apis'
import { useNamespace } from '@/hooks'
const n = useNamespace('add-edit-sub')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)

const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  dictId: null,
  code: null,
  name: '',
  elType: '',
  elClass: '',
  remark: '',
  sort: 1,
  status: ''
})
const rules = computed(() => {
  return {
    code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }]
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
      const r = await (form.id ? dictSubUpdateApi(form) : dictSubCreateApi(form))
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
      loading.value = false
    }
  })
}

const open = (dictId, id) => {
  visible.value = true
  form.dictId = dictId
  if (id) {
    loading.value = true
    form.id = id
    dictSubInfoApi({ id }).then(r => {
      if (r) {
        form.code = r.data.code ? +r.data.code : null
        form.name = r.data.name
        form.elType = r.data.elType
        form.elClass = r.data.elClass
        form.sort = r.data.sort
        form.remark = r.data.remark
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
@include b(add-edit-sub) {}
</style>
