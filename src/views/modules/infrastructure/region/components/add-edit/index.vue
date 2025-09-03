<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑区域' : '新增区域'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" />
      </el-form-item>
      <el-form-item label="编号" prop="code">
        <el-input v-model="form.code" placeholder="编号" />
      </el-form-item>
      <el-form-item label="上级" prop="parentId">
        <Region ref="refRegion" v-model="form.parentId" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { Region } from '@/components'
import { regionInfoApi, regionCreateApi, regionUpdateApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const regionRef = useTemplateRef('regionRef')
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  code: '',
  level: '',
  parentId: ''
})
const rules = computed(() => {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    code: [
      { required: true, message: '请输入区域编码', trigger: 'blur' },
      { validator: (_rule, value, callback) => {
        if (!isInteger(value)) {
          callback(new Error('请输入整数'))
        } else {
          callback()
        }
      }, trigger: 'blur' }
    ],
    parentId: [{ required: true, message: '请选择上级', trigger: 'blur' }]
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
      const params = {
        ...form,
        level: regionRef.value.getCheckedNodes().level + 1
      }
      loading.value = true
      const r = await form.id ? regionUpdateApi(params) : regionCreateApi(params)
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
    form.id = id
    loading.value = true
    regionInfoApi({ id }).then(r => {
      if (r) {
        form.id = r.data.id
        form.name = r.data.name
        form.code = r.data.code
        form.level = r.data.level
        form.parentId = r.data.parentId
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
