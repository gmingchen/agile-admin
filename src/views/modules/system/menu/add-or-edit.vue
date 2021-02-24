<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-24 17:25:45
-->
<template>
  <el-dialog width="500px" :title="!form.id ? '新增' : '编辑'" v-model="visible" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="formRef" @keyup.enter="submit()" label-width="80px">
      <!-- <el-form-item label="账号">
        <span>{{ username }}</span>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item> -->
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
import { select, info, save, edit } from '@API/system/menu/index'
import Icon from '@AST/icon'
import { IObject } from '@/utils/index.type'
import { $parseData2Tree } from '@U/index'

@Options({
  emits: ['refresh']
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected visible: boolean = false

  protected checkConfirmPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    // if (this.form.newPassword !== value) {
    //   callback(new Error('确认密码与新密码不一致'))
    // } else {
    //   callback()
    // }
  }

  protected form = {
    id: 0,
    type: 1,
    typeList: ['目录', '菜单', '按钮'],
    name: '',
    parentId: 0,
    parentName: '',
    url: '',
    perms: '',
    orderNum: 0,
    icon: '',
    iconList: []
  }
  protected rules = {
    password: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
    newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: '确认密码不能为空', trigger: 'blur' },
      { validator: this.checkConfirmPassword, trigger: 'blur' }
    ]
  }
  protected menuList: Array<IObject> = []
  protected menuListTreeProps = {
    label: 'name',
    children: 'children'
  }

  created() {
    this.form.iconList = Icon.getNameList() as never[]
  }

  async init(key: number = 0) {
    this.visible = true
    this.form.id = key
    const menu = await select()
    if (menu && menu.code === 0) {
      this.menuList = $parseData2Tree(menu.data)
    }
    if (key) {
      const r = await info(this.form.id)
      if (r && r.code === 0) {
        this.form.type = r.data.type
        this.form.name = r.data.name
        this.form.parentId = r.data.parentId
        this.form.url = r.data.url
        this.form.perms = r.data.perms
        this.form.orderNum = r.data.orderNum
        this.form.icon = r.data.icon
      }
    }
  }

  submit() {
    this.$refs['formRef'].validate(async (valid: boolean) => {
      if (valid) {
        const params = {
          id: this.form.id || null,
          type: this.form.type,
          name: this.form.name,
          parentId: this.form.parentId,
          url: this.form.url,
          perms: this.form.perms,
          orderNum: this.form.orderNum,
          icon: this.form.icon
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
}
</script>

<style lang="scss" scoped>
* {
  text-align: left;
}
</style>
