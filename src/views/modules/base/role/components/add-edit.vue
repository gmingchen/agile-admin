<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 22:42:39
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
import { IObject } from '@/utils/index.type'
import { IRole } from '@/api/base/role/index.type'
import { IMenuSelect } from '@/api/base/menu/index.type'
import { CascaderProps } from 'node_modules/element-plus/lib/el-cascader-panel/src/types'
import { ISet } from '@/store/modules/common/index.type'

@Options({
  emits: ['refresh']
})
export default class extends Vue {
  @Inject('set') readonly set!: ISet
  protected visible: boolean = false
  protected loading: boolean = false

  protected menus: IMenuSelect[] = []
  protected form: IRole = {
    id: null,
    name: '',
    remark: '',
    menu_ids: []
  }
  get menusProps(): CascaderProps {
    const prop = {
      multiple: true,
      emitPath: false,
      checkStrictly: true,
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
    this.form.id = id
    const res = await selfSelect()
    if (res) {
      res.data.push({
        id: 0,
        parent_id: 0,
        name_cn: '一级菜单',
        name_en: 'First level menu'
      })
      this.menus = $parseData2Tree(res.data, 'id', 'parent_id')
    }
    if (this.form.id) {
      info(this.form.id).then(r => {
        if (r) {
          this.form = r.data
        }
      })
    }
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
