<script setup>
import { ElMessage } from 'element-plus'

import WangEditor from '@/components/editor/wang/index.vue'

import { Status } from '@enums'

import { infoApi, createApi, updateApi } from '@/api/mail-template'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  name: '',
  code: '',
  title: '',
  content: '',
  remark: '',
  status: Status.ENABLE
})
const rules = reactive(function() {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
  }
}())

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await infoApi({ id })
    if (r) {
      const { name, code, title, content, remark, status } = r.data
      form.name = name
      form.code = code
      form.title = title
      form.content = content + '<p><br/></p>'
      form.remark = remark
      form.status = status
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
      const params = { ...form }
      params.content = encodeURI(form.content)
      const r = form.id ? await updateApi(params) : await createApi(params)
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
    width="50%"
    :title="form.id ? '编辑' : '新增'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable
    destroy-on-close>
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="refForm"
      label-width="110px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="名称"
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input
          v-model="form.code"
          placeholder="编码"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="form.title"
          placeholder="标题"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="模版内容" prop="content">
        <WangEditor v-model="form.content" placeholder="模版内容，变量使用 ${name} 表示" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="备注"
          type="textarea"
          maxlength="200"
          show-word-limit />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <DictRadio v-model="form.status" code="STATUS" />
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
