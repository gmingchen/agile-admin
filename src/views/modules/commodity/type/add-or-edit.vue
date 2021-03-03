<!--
 * @Description: 新增编辑弹窗
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-03 13:54:33
-->
<template>
  <el-dialog
    width="400px"
    v-model="visible"
    :title="`${!form.id ? '新增' : '编辑'}${+form.parent.level + 1}级分类`"
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
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" placeholder="分类名称" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="模型" prop="modelId">
        <!-- v-if="form.parent.level === 2" -->
        <el-select v-model="form.modelId" style="width: 100%" placeholder="模型" clearable>
          <el-option :label="item.name" :value="item.id" v-for="(item, index) in models" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示" prop="display">
        <el-switch v-model="form.display" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"> </el-switch>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="排序(非必填，默认为0)" maxlength="100"></el-input>
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
import { info, save, edit } from '@API/commodity/type/index'
import { select } from '@API/commodity/model/index'
import { IObject } from '@/utils/index.type'

@Options({
  emits: ['refresh']
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  protected form = {
    id: 0,
    name: '',
    modelId: '',
    display: 1,
    sort: '',
    parent: {}
  }
  protected rules = {
    name: [{ required: true, message: '模型名称不能为空', trigger: 'blur' }]
  }
  protected models: Array<IObject> = []
  protected visible: boolean = false
  protected loading: boolean = false

  /**
   * @description: 初始化事件
   * @param {number} key
   * @return {*}
   * @author: gumingchen
   */
  async init(parent, key: number = 0) {
    this.visible = true
    this.loading = true
    this.form.id = key
    this.form.parent = parent
    const model = await select()
    if (model && model.code === 0) {
      this.models = model.data
    }
    if (key) {
      const r = await info({ id: this.form.id })
      if (r && r.code === 0) {
        this.form.name = r.data.name
        this.form.sort = r.data.sort
        this.form.display = r.data.display
        this.form.modelId = r.data.goods_type_models.length ? r.data.goods_type_models[0].model_id : ''
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
          parent_id: +this.form.parent['id'],
          name: this.form.name,
          level: this.form.parent['level'] + 1,
          display: this.form.display,
          sort: this.form.sort,
          goods_type_models: this.form.modelId ? [{ model_id: this.form.modelId }] : []
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
