<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:59:35
-->
<template>
  <el-dialog
    width="500px"
    :title="!form.id ? '新增' : '编辑'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      v-loading="loading"
      ref="refForm"
      label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="32" />
      </el-form-item>
      <el-form-item label="键" prop="json_key">
        <el-input v-model="form.json_key" placeholder="键" />
      </el-form-item>
      <el-form-item label="Json值" prop="json_value">
        <el-input v-model="form.json_value" type="textarea" placeholder="Json字符串,如：{&quot;key&quot;: &quot;value&quot; }" />
      </el-form-item>
      <el-form-item label="类型值" prop="type">
        <el-input-number v-model="form.type" controls-position="right" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="备注"
          type="textarea"
          maxlength="200" />
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="item.value" v-for="item in dictionaryList" :key="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button v-repeat type="primary" @click="submit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'

import useDictionary from '@/mixins/dictionary'
import { isJson } from '@/utils/regular'

import { addApi, editApi, infoApi } from '@/api/develop/config'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const refForm = ref()

    const { dictionaryList, getDictionaryList } = useDictionary()
    const data = reactive({
      visible: false,
      loading: false,
      form: {
        id: null,
        name: '',
        json_key: '',
        json_value: '',
        remark: '',
        status: 0,
        type: 1
      }
    })

    const rules = reactive(function() {
      const checkJson = (_rule, value, callback) => {
        if (value === '' || !isJson(value)) {
          callback(new Error('请输入正确Json字符串'))
        } else {
          callback()
        }
      }
      return {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        json_key: [{ required: true, message: '请输入键', trigger: 'blur' }],
        json_value: [{ required: true, validator: checkJson, trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型值', trigger: 'change' }]
      }
    }())

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      getDictionaryList('status')
      if (data.form.id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form.name = r.data.name
          data.form.json_key = r.data.json_key
          data.form.json_value = r.data.json_value
          data.form.remark = r.data.remark
          data.form.status = r.data.status
          data.form.type = r.data.type || 1
        }
      }
      nextTick(() => {
        data.loading = false
      })
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
          const r = !data.form.id ? await addApi(data.form) : await editApi(data.form)
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
      dictionaryList,
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
