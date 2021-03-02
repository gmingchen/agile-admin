<!--
 * @Description: 新增编辑弹窗
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-02 16:15:32
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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !form.id }">
        <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !form.id }">
        <el-input v-model="form.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="form.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">{{ role.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
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
import { info, save, edit } from '@API/system/user/index'
import { select } from '@API/system/role/index'
import { owned } from '@API/system/menu/index'
import { IObject } from '@/utils/index.type'
import { $parseData2Tree } from '@U/index'
import { isEmail, isMobile } from '@U/regular'

@Options({
  emits: ['refresh']
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected visible: boolean = false
  protected loading: boolean = false

  protected checkPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    if (!this.form.id && !/\S/u.test(value)) {
      callback(new Error('密码不能为空'))
    } else {
      callback()
    }
  }
  protected checkComfirmPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    if (!this.form.id && !/\S/u.test(value)) {
      callback(new Error('确认密码不能为空'))
    } else if (this.form.password !== value) {
      callback(new Error('确认密码与密码输入不一致'))
    } else {
      callback()
    }
  }
  protected checkEmail = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    if (!isEmail(value)) {
      callback(new Error('邮箱格式错误'))
    } else {
      callback()
    }
  }
  protected checkMobile = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    if (!isMobile(value)) {
      callback(new Error('手机号格式错误'))
    } else {
      callback()
    }
  }

  protected form = {
    id: 0,
    username: '',
    password: '',
    comfirmPassword: '',
    salt: '',
    email: '',
    mobile: '',
    roleIdList: [],
    status: 1
  }
  protected rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ validator: this.checkPassword, trigger: 'blur' }],
    comfirmPassword: [{ validator: this.checkComfirmPassword, trigger: 'blur' }],
    email: [
      { required: true, message: '邮箱不能为空', trigger: 'blur' },
      { validator: this.checkEmail, trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: '手机号不能为空', trigger: 'blur' },
      { validator: this.checkMobile, trigger: 'blur' }
    ]
  }
  protected roleList: Array<IObject> = []

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
    const role = await select()
    if (role && role.code === 0) {
      this.roleList = role.data
    }
    if (key) {
      const r = await info(this.form.id)
      if (r && r.code === 0) {
        this.form.username = r.data.username
        this.form.salt = r.data.salt
        this.form.email = r.data.email
        this.form.mobile = r.data.mobile
        this.form.roleIdList = r.data.roleIdList
        this.form.status = r.data.status
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
          username: this.form.username,
          password: this.form.password,
          salt: this.form.salt,
          email: this.form.email,
          mobile: this.form.mobile,
          status: this.form.status,
          roleIdList: this.form.roleIdList
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
