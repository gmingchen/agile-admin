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
    width="600px"
    title="OSS配置"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      v-loading="loading"
      ref="refForm"
      label-position="top">
      <el-form-item label="类型" prop="id">
        <el-radio-group v-model="form.id" @change="changeHandle">
          <el-radio v-for="item in OSSs" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="域名" prop="domain" v-if="currentJsonValue.hasOwnProperty('domain')">
        <el-input v-model="form.domain" placeholder="域名" />
      </el-form-item>
      <el-form-item label="前缀" prop="prefix" v-if="currentJsonValue.hasOwnProperty('prefix')">
        <el-input v-model="form.prefix" placeholder="前缀" />
      </el-form-item>
      <el-form-item label="存储目录" prop="path" v-if="currentJsonValue.hasOwnProperty('path')">
        <el-input v-model="form.path" placeholder="存储目录" />
      </el-form-item>
      <el-form-item label="AccessKey" prop="access" v-if="currentJsonValue.hasOwnProperty('access')">
        <el-input v-model="form.access" placeholder="AccessKey" />
      </el-form-item>
      <el-form-item label="SecretKey" prop="secret" v-if="currentJsonValue.hasOwnProperty('secret')">
        <el-input v-model="form.secret" placeholder="SecretKey" />
      </el-form-item>
      <el-form-item label="空间名称" prop="bucket" v-if="currentJsonValue.hasOwnProperty('bucket')">
        <el-input v-model="form.bucket" placeholder="空间名称" />
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

import { isURL } from '@/utils/regular'

import { editValueApi, getInfoApi } from '@/api/develop/config'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      key: 'CLOUD_STORAGE',
      OSSs: [],
      form: {
        id: '',
        domain: '', // 域名
        prefix: '', // 前缀
        path: '', // 本地物理路径
        access: '', // AccessKey
        secret: '', // SecretKey
        bucket: '' // 存储空间名
      },
      currentJsonValue: {} // 当前选中的json value
    })

    const rules = reactive(function() {
      const checkDomain = (_rule, value, callback) => {
        if (value === '' || !isURL(value)) {
          callback(new Error('请输入正确的域名'))
        } else {
          callback()
        }
      }
      return {
        // id: [{ required: true, message: '请选择类型', trigger: 'change' }],
        domain: [{ required: true, validator: checkDomain, trigger: 'blur' }],
        path: [{ required: true, message: '请输入存储目录', trigger: 'blur' }],
        access: [{ required: true, message: '请输入AccessKey', trigger: 'blur' }],
        secret: [{ required: true, message: '请输入SecretKey', trigger: 'blur' }],
        bucket: [{ required: true, message: '请输入空间名称', trigger: 'blur' }]
      }
    }())

    /**
     * @description: 类型切换 表单赋值
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const changeHandle = (id) => {
      const current = data.OSSs.filter(item => item.id === id)[0]
      data.currentJsonValue = JSON.parse(current.json_value)

      data.form.id = current.id
      for (const key in data.currentJsonValue) {
        data.form[key] = data.currentJsonValue[key]
      }
    }

    const init = () => {
      data.visible = true
      data.loading = true
      getInfoApi(data.key).then(r => {
        if (r) {
          data.OSSs = r.data
          const current = r.data.filter(item => item.status === 1)[0]
          changeHandle(current.id)
        }
        nextTick(() => {
          data.loading = false
        })
      })
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
          const jsonObj = {}
          for (const key in data.currentJsonValue) {
            jsonObj[key] = data.form[key]
          }
          const jsonStr = JSON.stringify(jsonObj)
          const params = {
            id: data.form.id,
            json_key: data.key,
            json_value: jsonStr
          }
          editValueApi(params).then(r => {
            if (r) {
              data.visible = false
              ElMessage({
                message: '操作成功!',
                type: 'success'
              })
              emit('refresh')
            }
          })
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
      ...toRefs(data),
      rules,
      init,
      submit,
      changeHandle,
      dialogClosedHandle
    }
  }
})
</script>
