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
    title="邮箱配置"
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
          <el-radio v-for="item in types" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="username">
        <el-input v-model="form.username" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="授权码" prop="password">
        <el-input v-model="form.password" placeholder="授权码" />
      </el-form-item>
      <el-form-item label="协议" prop="protocol">
        <el-input v-model="form.protocol" placeholder="协议" />
      </el-form-item>
      <el-form-item label="主机" prop="host">
        <el-input v-model="form.host" placeholder="主机" />
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="form.port" placeholder="端口" />
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

import { isEmail, isPort } from '@/utils/regular'

import { editValueApi, getInfoApi } from '@/api/develop/config'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      key: 'MAILBOX_CONFIG',
      types: [],
      form: {
        id: '',
        username: '',
        password: '',
        protocol: '',
        host: '',
        port: ''
      }
    })

    const rules = reactive(function() {
      const checkEmail = (_rule, value, callback) => {
        if (value === '' || !isEmail(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      }
      const checkPort = (_rule, value, callback) => {
        if (value === '' || !isPort(value)) {
          callback(new Error('请输入正确的端口'))
        } else {
          callback()
        }
      }
      return {
        id: [{ required: true, message: '请选择类型', trigger: 'change' }],
        username: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        password: [{ required: true, message: '请输入授权码', trigger: 'blur' }],
        protocol: [{ required: true, message: '请输入协议', trigger: 'blur' }],
        host: [{ required: true, message: '请输入主机地址', trigger: 'blur' }],
        port: [{ required: true, validator: checkPort, trigger: 'blur' }]
      }
    }())

    /**
     * @description: 类型切换 表单赋值
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const changeHandle = (id) => {
      const current = data.types.filter(item => item.id === id)[0]
      const jsonValue = JSON.parse(current.json_value)
      data.form.id = current.id
      data.form.username = jsonValue.username
      data.form.password = jsonValue.password
      data.form.protocol = jsonValue.protocol
      data.form.host = jsonValue.host
      data.form.port = jsonValue.port
    }

    /**
     * @description: 初始化
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const init = () => {
      data.visible = true
      data.loading = true
      getInfoApi(data.key).then(r => {
        if (r) {
          data.types = r.data
          const current = data.types.filter(item => item.status === 1)[0]
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
          const jsonStr = JSON.stringify({
            username: data.form.username,
            password: data.form.password,
            protocol: data.form.protocol,
            host: data.form.host,
            port: data.form.port
          })
          const params = {
            id: data.form.id,
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
      changeHandle,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
