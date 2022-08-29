<template>
  <el-dialog
    width="500px"
    title="发送消息"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          rows="3"
          placeholder="内容" />
      </el-form-item>
      <el-form-item label="消息类型" prop="type">
        <el-radio-group v-model="form.type">
          <template v-for="item in dictionaryList" :key="item.value">
            <el-radio
              :label="item.value"
              v-if="item.value === 0 ? havePermission('global:websocket:create') : true">
              {{ item.label }}
            </el-radio>
          </template>
        </el-radio-group>
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
import { reactive, ref, onBeforeMount } from 'vue'

import { ElMessage } from 'element-plus'

import useDictionary from '@/mixins/dictionary'
import { havePermission } from '@/utils'

import { addApi, globalAddApi } from '@/api/websocket'

const emits = defineEmits(['refresh'])

const { dictionaryList, getDictionary } = useDictionary()

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  content: '',
  type: 1
})
const rules = reactive(function() {
  return {
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
    type: [{ required: true, message: '请选择消息类型', trigger: 'blur' }]
  }
}())

const init = () => {
  visible.value = true
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
      const params = { ...form }
      const r = form.type === 0 ? await globalAddApi(params) : await addApi(params)
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

onBeforeMount(() => {
  getDictionary('websocket')
})

defineExpose({
  init
})
</script>
