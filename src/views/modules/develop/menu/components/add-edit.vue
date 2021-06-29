<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-29 14:12:49
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
      <el-form-item :label="$t('field.type')">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">{{ $t('base.menu.catalog') }}</el-radio>
          <el-radio :label="1">{{ $t('base.menu.menu') }}</el-radio>
          <el-radio :label="2">{{ $t('base.menu.button') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('base.menu.chineseName')" prop="name_cn">
        <el-input v-model="form.name_cn" :placeholder="$t('base.menu.chineseName')" />
      </el-form-item>
      <el-form-item :label="$t('base.menu.englishName')" prop="name_en">
        <el-input v-model="form.name_en" :placeholder="$t('base.menu.englishName')" />
      </el-form-item>
      <el-form-item :label="$t('base.menu.superior')" prop="parent_id">
        <el-cascader
          ref="cascaderR"
          v-model="form.parent_id"
          :options="menus"
          :props="menusProps"
          :show-all-levels="false" />
      </el-form-item>
      <el-form-item v-if="form.type === 1 || form.type === 2" label="URL" prop="url">
        <el-input v-model="form.url" placeholder="URL" />
      </el-form-item>
      <el-form-item v-if="form.type !== 0" :label="$t('base.menu.authMark')" prop="permission">
        <el-input v-model="form.permission" :placeholder="$t('base.menu.authPlaceholder')" />
      </el-form-item>
      <el-form-item v-if="form.type !== 2" :label="$t('field.sort')" prop="sort">
        <el-input-number
          v-model="form.sort"
          controls-position="right"
          :min="0"
          :label="$t('field.sort')" />
      </el-form-item>
      <el-form-item v-if="form.type !== 2" :label="$t('field.icon')" prop="icon">
        <el-popover
          trigger="click"
          placement="bottom"
          popper-class="popper-menu-add-edit"
          width="330px">
          <div class="icon-wrap">
            <el-button type="text" @click="form.icon = ''">{{ $t('button.clear') }}</el-button>
            <br>
            <el-button
              v-for="(item, index) in icons"
              :key="index"
              :class="{ 'is-active': item === form.icon }"
              size="mini"
              class="icon-btn"
              @click="iconActiveHandle(item)">
              <svg-icon :name="item" />
            </el-button>
          </div>
          <template #reference>
            <el-input v-model="form.icon" :placeholder="$t('field.icon')" readonly />
          </template>
        </el-popover>
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
import Icon from '@/assets/icon'
import { add, edit, info, select } from '@/api/develop/menu'
import { $parseData2Tree } from '@/utils/index'
import { Set } from '@/store/modules/common'
import { IObject } from '@/types'
import { El } from '@/types/el'
import { Menu } from '@/types/menu'

@Options({
  emits: ['refresh']
})
export default class extends Vue {
  @Inject('set') readonly set!: Set
  protected visible: boolean = false
  protected loading: boolean = false

  protected icons: string[] = []
  protected menus: Menu.Simple[] = []
  protected form: Menu.Dto = {
    id: null,
    parent_id: 0,
    name_cn: '',
    name_en: '',
    url: '',
    type: 1,
    permission: '',
    icon: null,
    sort: 0
  }
  get menusProps(): El.CascaderProps {
    const prop = {
      emitPath: false,
      checkStrictly: true,
      value: 'id',
      label: `name_${ this.set.language }`,
      children: 'children'
    }
    return prop
  }
  get rules(): IObject {
    const checkUrl = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
      if (this.form.type === 1 && !/\S/u.test(value)) {
        callback(new Error(this.$t('rule.notBlank', ['URL'])))
      } else {
        callback()
      }
    }
    const rules = {
      name_cn: [{ required: true, message: this.$t('rule.notBlank', [this.$t('base.menu.chineseName')]), trigger: 'blur' }],
      name_en: [{ required: true, message: this.$t('rule.notBlank', [this.$t('base.menu.englishName')]), trigger: 'blur' }],
      parent_id: [{ required: true, message: this.$t('rule.notBlank', [this.$t('base.menu.superior')]), trigger: 'change' }],
      url: [{ validator: checkUrl, trigger: 'blur' }]
    }
    this.$nextTick(() => {
      this.$refs.formR.clearValidate()
    })
    return rules
  }

  created(): void {
    this.icons = Icon.getNames()
    this.init()
  }

  async init(id?: number): Promise<void> {
    this.visible = true
    this.loading = true
    this.form.id = id
    const res = await select()
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
   * @description: 图标选中事件
   * @param {string} icon
   * @return {*}
   * @author: gumingchen
   */
  iconActiveHandle(icon: string): void {
    this.form.icon = icon
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
