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

<script>
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'
import Local from './local'
import Qiniu from './qiniu'

import { listApi } from '@/api/configuration'
import { updateConfigApi } from '@/api/file'

export default defineComponent({
  emits: ['refresh'],
  components: { Local, Qiniu },
  setup() {
    const refForm = ref()

    const data = reactive({
      visible: false,
      loading: false,
      key: 'CLOUD_STORAGE',
      types: [],
      id: '',
      current: {
        type: '',
        json_value: {}
      }
    })

    const component = computed(() => {
      let result = ''
      switch (data.current.type) {
        case 1:
          result = 'Local'
          break
        case 2:
          result = 'Qiniu'
          break
      }
      return result
    })

    const init = async () => {
      data.visible = true
      data.loading = true
      const r = await listApi(data.key)
      if (r) {
        data.types = r.data
        for (let i = 0; i < data.types.length; i++) {
          const item = data.types[i]
          if (item.status === 1) {
            data.id = item.id
            const val = item.json_value ? JSON.parse(item.json_value) : {}
            data.current = {
              ...item,
              json_value: val
            }
            break
          }
        }
      }
      nextTick(() => { data.loading = false })
    }

    const changeHandle = (id) => {
      for (let i = 0; i < data.types.length; i++) {
        const item = data.types[i]
        if (item.id === id) {
          data.id = item.id
          const val = item.json_value ? JSON.parse(item.json_value) : {}
          data.current = {
            ...item,
            json_value: val
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
            id: data.id,
            json_key: data.key,
            json_value: JSON.stringify(form)
          }
          const r = await updateConfigApi(params)
          if (r) {
            data.visible = false
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

    return {
      refForm,
      component,
      ...toRefs(data),
      init,
      changeHandle,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
