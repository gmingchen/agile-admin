<script setup>
import { ElMessage } from 'element-plus'

import useModel from '@/hooks/model'
import { AUTH_KEY, SUCCESS_CODE } from '@constants'

import { uploadUrlApi } from '@/api/file'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    required: true,
    default: () => ''
  }
})

const authStore = useAuthStore()

const value = useModel(props)

const action = ref(uploadUrlApi())
const authKey = ref(AUTH_KEY)
const token = ref(authStore.token)

const successHandle = (r) => {
  if (SUCCESS_CODE.includes(r.code)) {
    value.value = r.data
  } else {
    ElMessage({
      message: r.message,
      type: 'warning'
    })
  }
}
</script>

<template>
  <el-upload
    :action="action"
    :headers="{
      [authKey]: token
    }"
    v-bind="$attrs"
    :on-success="successHandle">
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" v-bind:url="value" />
    </template>
  </el-upload>
</template>

<style lang="scss" scoped>

</style>
