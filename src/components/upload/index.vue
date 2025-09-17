<template>
  <component
    :class="n.b()"
    :is="h(
      ElUpload,
      {
        ref: handleRef,
        action: url,
        headers: { [TOKEN_KEY]: token },
        showFileList: false,
        'on-success': onSuccess,
        ...$attrs,
      },
      $slots
    )"
  />
</template>

<script setup>
import { getCurrentInstance, h, } from 'vue'
import { ElUpload } from 'element-plus'
import { useAuthStore } from '@/stores'
import { print } from '@/common/utils'
import { TOKEN_KEY, BASE_URL, uploadUrl, handleResponse } from '@/apis'
import { useNamespace } from '@/hooks'
import { storeToRefs } from 'pinia'

const n = useNamespace('upload')

const emits = defineEmits(['success', 'fail'])

const authStore = useAuthStore()
const { token } = storeToRefs(authStore)

const url = BASE_URL + uploadUrl()

const instance = getCurrentInstance()
const handleRef = (exposed) => {
  instance.exposed = exposed
}

const onSuccess = (response, file, files) => {
  print('Upload onSuccess', response)
  const r = handleResponse(response)
  if (r) {
    emits('success', r.data, file, files)
  } else {
    emits('fail', response, file, files)
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: sidebar#{$element-separator};
@include b(upload) {
  ::v-deep(.el-upload-list) {
    margin: unset;
  }
}
</style>
