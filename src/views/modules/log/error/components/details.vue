<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 16:00:13
-->
<template>
  <el-dialog
    width="1200px"
    title="异常信息"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <div class="details" v-html="details" />
    <template #footer>
      <span class="dialog-footer">
        <gl-button
          sort="confirm"
          v-repeat
          type="primary"
          @click="visible = false" />
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  emits: ['refresh'],
  setup() {
    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      details: ''
    })

    const init = (details) => {
      data.visible = true
      data.loading = true
      data.details = details.replace(/\n/g, '<br />')
      nextTick(() => {
        data.loading = false
      })
    }

    /**
   * @description: 弹窗关闭动画结束时的回调
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
    const dialogClosedHandle = () => {
      data.details = ''
    }

    return {
      refForm,
      ...toRefs(data),
      init,
      dialogClosedHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.details {
  line-height: 20px;
}
</style>
