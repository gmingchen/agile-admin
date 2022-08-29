<template>
  <el-dialog
    width="450px"
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
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="Spring Bean" prop="bean">
        <el-input v-model="form.bean" placeholder="Spring Bean" />
      </el-form-item>
      <el-form-item label="Cron表达式" prop="expression">
        <el-input v-model="form.expression" placeholder="Cron表达式" />
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <el-input
          v-model="form.params"
          type="textarea"
          placeholder="参数"
          rows="3" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="备注"
          rows="3" />
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

<script setup>
import { computed, nextTick, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'

import { infoApi, addApi, editApi } from '@/api/timed-task'

const emits = defineEmits(['refresh'])

const refForm = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  id: null,
  bean: '',
  expression: '',
  params: '',
  status: 1,
  remark: ''
})
const roles = ref([])
const rules = computed(() => {
  return {
    bean: [{ required: true, message: '请输入Spring Bean', trigger: 'blur' }],
    expression: [{ required: true, message: '请输入Cron表达式', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }]
  }
})

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await infoApi(id)
    if (r) {
      form.bean = r.data.bean
      form.expression = r.data.expression
      form.params = r.data.params
      form.status = r.data.status
      form.remark = r.data.remark
    }
  }
  nextTick(() => { loading.value = false })
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const submit = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      const r = form.id ? await editApi(form) : await addApi(form)
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
 * @author: gumingchen
 */
const dialogClosedHandle = () => {
  refForm.value.resetFields()
}

defineExpose({
  init
})
</script>
