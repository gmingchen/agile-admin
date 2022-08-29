<template>
  <el-dialog
    width="500px"
    title="备份配置"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <div v-loading="loading">
      <el-form label-position="top">
        <el-form-item label="类型">
          <el-radio-group v-model="id" @change="changeHandle">
            <el-radio v-for="item in types" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <component
        ref="refForm"
        :is="component"
        :data="current.json_value"
        v-if="component" />
    </div>
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
import { computed, nextTick, ref } from 'vue'

import { ElMessage } from 'element-plus'
import QQ from './qq.vue'

import { listApi } from '@/api/configuration'
import { updateConfigApi } from '@/api/mail'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const key = 'MAILBOX_CONFIG'
const types = ref([])
const id = ref('')
const current = ref({
  type: '',
  json_value: {}
})

const component = computed(() => {
  let result = ''
  switch (current.value.type) {
    case 1:
      result = QQ
      break
  }
  return result
})

const init = async () => {
  visible.value = true
  loading.value = true
  const r = await listApi(key)
  if (r) {
    types.value = r.data
    for (let i = 0; i < types.value.length; i++) {
      const item = types.value[i]
      if (item.status === 1) {
        id.value = item.id
        const val = item.json_value ? JSON.parse(item.json_value) : {}
        current.value = {
          ...item,
          json_value: val
        }
        break
      }
    }
  }
  nextTick(() => { loading.value = false })
}

const changeHandle = (val) => {
  for (let i = 0; i < types.value.length; i++) {
    const item = types.value[i]
    if (item.id === val) {
      id.value = item.id
      const value = item.json_value ? JSON.parse(item.json_value) : {}
      current.value = {
        ...item,
        json_value: value
      }
      break
    }
  }
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const submit = () => {
  refForm.value.validate(async (valid, form = {}) => {
    if (valid) {
      const params = {
        id: id.value,
        json_key: key,
        json_value: JSON.stringify(form)
      }
      const r = await updateConfigApi(params)
      if (r) {
        visible.value = false
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
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
// refForm.value.resetFields()
}

defineExpose({
  init
})
</script>
