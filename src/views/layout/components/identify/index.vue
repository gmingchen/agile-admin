<template>
  <el-dialog
    width="500px"
    title="人机识别"
    v-model="visible"
    :close-on-click-modal="false"
    append-to-body
    draggable
    destroy-on-close>
    <div :class="n.b()">
      <div :class="n.e('content')">
        <div>微信扫描下方二维码，回复【后台验证】</div>
        <div>进行人机识别验证</div>
        <img class="s-250" src="https://admin.gumingchen.icu/file/static/official-account-qr-code.jpg">
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" @keyup.enter="onConfirm()">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="验证码" @input="onInput" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button v-repeat type="primary" @click="onConfirm()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useNamespace } from '@/hooks'
import { onBeforeMount } from 'vue'

const n = useNamespace('identify')

const visible = ref(false)
const codes = ['tuohai', 'haoshiming']

const formRef = useTemplateRef('formRef')
const form = reactive({
  code: ''
})
const rules = computed(() => {
  return {
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }
})

const open = () => visible.value = true

const validate = (code) => {
  return codes.includes(code)
}

const handleValidate = () => {
  const code = localStorage.getItem('human')
  return validate(code) || validate(form.code)
}

const onInput = () => {
  if (handleValidate()) {
    visible.value = false
    localStorage.setItem('human', form.code)
  }
}

const onConfirm = async () => {
  formRef.value.validate(valid => {
    if (valid) {
      if (validate(form.code)) {
        visible.value = false
        localStorage.setItem('human', form.code)
      } else {
        ElMessage.warning('验证码不正确，请先扫描二维码获取验证码!')
      }
    }
  })
}

onBeforeMount(() => {
  if (!handleValidate()) {
    visible.value = true
  }
})

defineExpose({ open, handleValidate })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: identify#{$element-separator};
@include b(identify) {
  @include e(content) {
    text-align: center;
    color: red;
  }
}
</style>
