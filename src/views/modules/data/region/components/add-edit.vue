<template>
  <el-dialog
    width="500px"
    :title="form.id ? '编辑' : '新增'"
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
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" />
      </el-form-item>
      <el-form-item label="编号" prop="code">
        <el-input v-model="form.code" placeholder="编号" />
      </el-form-item>
      <el-form-item label="上级" prop="parent_id">
        <Region ref="refRegion" v-model="form.parent_id" />
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

<script>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'
import Region from '@/components/region/index.vue'

import { isInteger } from '@/utils/regular'

import { infoApi, addApi, editApi } from '@/api/region'

export default defineComponent({
  emits: ['refresh'],
  components: { Region },
  setup(_props, { emit }) {
    const refForm = ref()
    const refRegion = ref()
    const data = reactive({
      visible: false,
      loading: false,
      form: {
        id: null,
        name: '',
        code: '',
        level: '',
        parent_id: ''
      }
    })

    const rules = reactive(function() {
      const checkCode = (_rule, value, callback) => {
        if (!isInteger(value)) {
          callback(new Error('请输入整数'))
        } else {
          callback()
        }
      }
      return {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入区域编码', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        parent_id: [{ required: true, message: '请选择上级', trigger: 'blur' }]
      }
    }())

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id

      if (id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form.id = r.data.id
          data.form.name = r.data.name
          data.form.code = r.data.code
          data.form.level = r.data.level
          data.form.parent_id = r.data.parent_id
        }
      }
      nextTick(() => { data.loading = false })
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
          const params = {
            ...data.form,
            level: refRegion.value.getCheckedNodes().level + 1
          }
          const r = data.form.id ? await editApi(params) : await addApi(params)
          if (r) {
            data.visible = false
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
            emit('refresh')
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

    return {
      refForm,
      refRegion,
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
