<template>
  <el-upload
    class="update-container"
    :style="{ height: size, width: size }"
    :action="action"
    :headers="{
      [tokenKey]: token
    }"
    :show-file-list="false"
    :on-success="successHandle"
    :disabled="disabled"
    accept="image/*">
    <img v-if="value" :src="value" class="height-full width-full">
    <Iconfont name="plus" v-else />
  </el-upload>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

import { ElMessage } from 'element-plus'

import useModel from '@/mixins/model'
import { TOKEN_KEY, SUCCESS_CODE } from '@/utils/constant'

import { uploadUrlApi } from '@/api/file'

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Array],
      required: true,
      default: () => ''
    },
    // 大小 默认 100px
    size: {
      type: String,
      default: () => '100px'
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const store = useStore()

    const value = useModel(props)

    const data = reactive({
      action: uploadUrlApi(),
      tokenKey: TOKEN_KEY,
      token: store.getters['administrator/tokenVal']
    })

    const successHandle = (r) => {
      if (SUCCESS_CODE.includes(r.code)) {
        value.value = r.data.url
      } else {
        ElMessage({
          message: r.message,
          type: 'warning'
        })
      }
    }

    return {
      value,
      ...toRefs(data),
      successHandle
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.el-upload), ::v-deep(.el-upload-list) {
  height: 100%;
  width: 100%;
}
::v-deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
  }
}
.update-container {
  img {
    object-fit: contain;
  }
}

</style>
