<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-29 14:08:04
-->
<template>
  <el-dialog
    width="500px"
    :title="$t(!form.id ? 'button.add' : 'button.edit')"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      v-loading="loading"
      ref="formR"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item :label="$t('base.role.roleName')" prop="name">
        <el-input v-model="form.name" :placeholder="$t('base.role.roleName')" />
      </el-form-item>
      <el-form-item :label="$t('field.remark')" prop="remark">
        <el-input v-model="form.remark" :placeholder="$t('field.remark')" />
      </el-form-item>
      <el-form-item :label="$t('base.role.auth')" prop="parent_id">
        <el-cascader
          ref="cascaderR"
          v-model="form.menu_ids"
          :options="menus"
          :props="menusProps"
          :show-all-levels="false"
          collapse-tags
          clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" @click="submit()">{{ $t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Inject } from 'vue-property-decorator'
import { add, edit, info } from '@/api/base/role'
import { selfSelect } from '@/api/base/menu'
import { $parseData2Tree } from '@/utils/index'
import { Set as ISet } from '@/store/modules/common'
import { El } from '@/types/el'
import { IObject } from '@/types'
import { Menu } from '@/types/menu'
import { Role } from '@/types/role'

@Options({
  emits: ['refresh']
})
export default class extends Vue {
  @Inject('set') readonly set!: ISet
  protected visible: boolean = false
  protected loading: boolean = false

  protected menus: Menu.Simple[] = []
  protected form: Role.Dto = {
    id: null,
    name: '',
    remark: '',
    menu_ids: []
  }
  get menusProps(): El.CascaderProps {
    const prop = {
      multiple: true,
      emitPath: false,
      checkStrictly: false,
      value: 'id',
      label: `name_${ this.set.language }`,
      children: 'children'
    }
    return prop
  }
  get rules(): IObject {
    const rules = {
      name: [{ required: true, message: this.$t('rule.notBlank', [this.$t('base.role.roleName')]), trigger: 'blur' }]
    }
    this.$nextTick(() => {
      this.$refs.formR.clearValidate()
    })
    return rules
  }

  async init(id?: number): Promise<void> {
    this.visible = true
    this.loading = true
    this.form.id = id
    const res = await selfSelect()
    if (res) {
      res.data.push({
        id: 0,
        parent_id: 0,
        name_cn: '一级菜单',
        name_en: 'First level menu',
        children: []
      })
      this.menus = $parseData2Tree(res.data, 'id', 'parent_id')
    }
    if (this.form.id) {
      const r = await info(this.form.id)
      if (r) {
        this.form = r.data
      }
    }
    this.$nextTick(() => {
      this.loading = false
    })
  }

  /**
   * @description: 表单验证提交
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  submit(): void {
    this.$refs.formR.validate(async (valid: boolean) => {
      if (valid) {
        // 处理菜单权限ID
        const checkedNodes = this.$refs.cascaderR.getCheckedNodes(true) as El.CascaderCheckedNode<number>[]
        let menuIds: number[] = []
        checkedNodes.forEach(item => {
          menuIds.push.apply(menuIds, item.pathValues)
        })
        menuIds = Array.from(new Set(menuIds)).filter(item => {
          return item !== 0
        })
        this.form.menu_ids = menuIds

        const r = !this.form.id ? await add(this.form) : await edit(this.form)
        if (r) {
          this.visible = false
          this.$message({
            message: this.$t('tip.success'),
            type: 'success'
          })
          this.$emit('refresh')
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
    this.$refs['formR'].resetFields()
  }
}
</script>
