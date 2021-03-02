<!--
 * @Description: 新增编辑弹窗
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-02 15:03:13
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
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="授权" prop="menus">
        <el-cascader
          ref="cascaderRef"
          v-model="form.menus"
          :options="menuList"
          :props="menuListProps"
          :show-all-levels="false"
          collapse-tags
          clearable
        ></el-cascader>
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
import { info, save, edit } from '@API/system/role/index'
import { owned } from '@API/system/menu/index'
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
  protected loading: boolean = false

  protected form = {
    id: 0,
    roleName: '',
    remark: '',
    menus: []
  }
  protected rules = {
    roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
  }
  protected menuList: Array<IObject> = []
  protected menuListProps = {
    multiple: true,
    emitPath: false,
    checkStrictly: false,
    value: 'id',
    label: 'name',
    children: 'children'
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
    const menu = await owned()
    if (menu && menu.code === 0) {
      this.menuList = $parseData2Tree(menu.data)
    }
    if (key) {
      const r = await info(this.form.id)
      if (r && r.code === 0) {
        this.form.roleName = r.data.name
        this.form.remark = r.data.remark
        this.form.menus = r.data.menuIdList
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
          name: this.form.roleName,
          remark: this.form.remark,
          menuIdList: this.form.menus
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
