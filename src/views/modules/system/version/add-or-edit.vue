<!--
 * @Description: 新增编辑弹窗
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-01 14:21:01
-->
<template>
  <el-dialog
    width="40%"
    v-model="visible"
    :title="!form.id ? '新增' : '编辑'"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @closed="dialogClosedHandle"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      @keyup.enter="submit()"
      label-width="80px"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
    >
      <el-form-item label="AppKey" prop="app">
        <el-input v-model="form.app" placeholder="AppKey" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="版本号" prop="version">
        <el-input v-model="form.version" placeholder="版本号" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="Apk" prop="apk">
        <el-input v-model="form.apk" placeholder="Apk(选填)" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="升级类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">不升级</el-radio>
          <el-radio :label="1">升级</el-radio>
          <el-radio :label="2">强制升级</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="升级提示" prop="upgradePrompt">
        <el-input type="textarea" v-model="form.upgradePrompt" placeholder="升级提示" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="更新内容" prop="content">
        <el-input type="textarea" v-model="form.content" placeholder="更新内容" maxlength="200"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { info, save, edit } from '@API/system/version/index'

@Options({
  emits: ['refresh']
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected visible: boolean = false
  protected loading: boolean = false

  protected checkApp = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    const reg = /^[0-9A-Za-z]{1,10}$/gu
    if (value === '') {
      callback(new Error('AppKey不能为空'))
    } else if (!reg.test(value)) {
      callback(new Error('AppKey是由1~10位的数字或者字母组成'))
    } else {
      callback()
    }
  }
  protected checkVersion = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    const reg = /^[0-9A-Za-z]{1,5}(\.[0-9A-Za-z]{1,5}){2}$/gu
    if (value === '') {
      callback(new Error('版本号不能为空'))
    } else if (!reg.test(value)) {
      callback(new Error('版本号的正确格式为-> X.X.X (X可为数组或者字母)'))
    } else {
      callback()
    }
  }
  protected checkApk = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    const reg = /^http[s]?:\/\/.*(.apk)$/gu
    if (value === '') {
      callback()
    } else if (!reg.test(value)) {
      callback(new Error('请输入正确的Apk的URL'))
    } else {
      callback()
    }
  }

  protected form = {
    id: 0,
    app: '',
    version: '',
    apk: '',
    type: 2,
    upgradePrompt: '检测到新版本',
    content: ''
  }
  protected rules = {
    app: [
      { required: true, message: 'AppKey不能为空', trigger: 'blur' },
      { validator: this.checkApp, trigger: 'blur' }
    ],
    version: [
      { required: true, message: '版本号不能为空', trigger: 'blur' },
      { validator: this.checkVersion, trigger: 'blur' }
    ],
    apk: [{ validator: this.checkApk, trigger: 'blur' }],
    upgradePrompt: [{ required: true, message: '升级提示不能为空', trigger: 'blur' }],
    content: [{ required: true, message: '更新内容不能为空', trigger: 'blur' }]
  }

  /**
   * @description: 初始化事件
   * @param {number} key
   * @return {*}
   * @author: gumingchen
   */
  async init(key: number = 0) {
    this.visible = true
    this.loading = true
    this.form.id = key
    if (key) {
      const r = await info({ id: this.form.id })
      if (r && r.code === 0) {
        this.form.app = r.data.app
        this.form.version = r.data.version
        this.form.apk = r.data.apk
        this.form.type = r.data.type
        this.form.upgradePrompt = r.data.upgrade_prompt
        this.form.content = r.data.content
      }
    }
    this.loading = false
  }

  /**
   * @description: 表单提交
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  submit(): void {
    this.$refs['formRef'].validate(async (valid: boolean) => {
      if (valid) {
        const params = {
          id: this.form.id || null,
          app: this.form.app,
          version: this.form.version,
          apk: this.form.apk,
          type: this.form.type,
          upgrade_prompt: this.form.upgradePrompt,
          content: this.form.content
        }
        const r = !this.form.id ? await save(params) : await edit(params)
        if (r && r.code === 0) {
          this.visible = false
          this['$message']({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.$emit('refresh')
            }
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
  dialogClosedHandle(): void {
    this.$refs['formRef'].resetFields()
  }
}
</script>

<style lang="scss" scoped></style>
