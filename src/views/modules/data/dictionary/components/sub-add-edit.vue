<template>
  <el-dialog
    width="450px"
    :title="form.id ? '编辑字典项' : '新增字典项'"
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
      <el-form-item label="编码" prop="code">
        <el-input
          v-model="form.code"
          placeholder="编码"
          maxlength="32"
          show-word-limit />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="名称"
          maxlength="32"
          show-word-limit />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="form.sort"
          :min="1"
          controls-position="right" />
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
          placeholder="备注"
          maxlength="100"
          type="textarea"
          show-word-limit />
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

import { subInfoApi, subAddApi, subEditApi } from '@/api/dictionary'

const emits = defineEmits(['refresh'])

const refForm = ref()
const loading = ref(false)
const visible = ref(false)
const roles = ref([])
const form = reactive({
  id: null,
  dictionary_id: null,
  code: '',
  name: '',
  remark: '',
  sort: 1,
  status: 1
})
const rules = computed(() => {
  return {
    code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }]
  }
})

const init = async ({ dictionaryId, id }) => {
  visible.value = true
  loading.value = true
  form.dictionary_id = dictionaryId
  form.id = id

  if (id) {
    const r = await subInfoApi(id)
    if (r) {
      form.code = r.data.code
      form.name = r.data.name
      form.sort = r.data.sort
      form.remark = r.data.remark
      form.status = r.data.status
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
      const r = form.id ? await subEditApi(form) : await subAddApi(form)
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
