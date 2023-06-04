<script setup>
import { ElMessage } from 'element-plus'

import { getHuman, setHuman } from '@/utils/storage'

const refForm = ref()
const visible = ref(false)

const code = 'tuohai'

const form = reactive({
  code: ''
})
const rules = computed(() => {
  return {
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }
})

const init = () => {
  const human = getHuman()
  if (human !== code) {
    visible.value = true
    return false
  }
  return true
}

const validated = (tips = false) => {
  if (form.code === code) {
    visible.value = false
    setHuman(code)
  } else if (tips) {
    ElMessage({
      message: '验证码不正确，请先扫描二维码获取验证码!',
      type: 'warning'
    })
  }
}

const inputHandle = () => {
  validated()
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const submit = () => {
  refForm.value.validate(valid => {
    if (valid) {
      validated(true)
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
  init()
})

defineExpose({
  init
})
</script>

<template>
  <el-dialog
    width="500px"
    title="人机识别"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable
    destroy-on-close>
    <div class="text-align-center">
      <div class="tips-box">微信扫描下方二维码，回复【后台验证】</div>
      <div class="tips-box">进行人机识别验证</div>
      <img class="width-250 height-250" src="http://oss.gumingchen.icu/image/official-account-qr-code.jpg">
    </div>
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()">
      <el-form-item label="验证码" prop="code">
        <el-input
          v-model="form.code"
          placeholder="验证码"
          @input="inputHandle" />
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

<style lang="scss" scoped>
.tips-box {
  color: red;
}
</style>
