<!--
 * @Description: 新增编辑弹窗
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-26 17:35:05
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
      label-width="100px"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
    >
      <el-form-item label="bean名称" prop="beanName">
        <el-input v-model="form.beanName" placeholder="spring bean名称, 如: testTask"></el-input>
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <el-input v-model="form.params" placeholder="参数"></el-input>
      </el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression">
        <el-input v-model="form.cronExpression" placeholder="如: 0 0 12 * * ?"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注"></el-input>
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
import { info, save, edit } from '@API/system/job/index'

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
    beanName: '',
    params: '',
    cronExpression: '',
    remark: '',
    status: 0
  }
  protected rules = {
    beanName: [{ required: true, message: 'bean名称不能为空', trigger: 'blur' }],
    cronExpression: [{ required: true, message: 'cron表达式不能为空', trigger: 'blur' }]
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
      const r = await info(this.form.id)
      if (r && r.code === 0) {
        this.form.beanName = r.data.beanName
        this.form.params = r.data.params
        this.form.cronExpression = r.data.cronExpression
        this.form.remark = r.data.remark
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
          jobId: this.form.id || null,
          beanName: this.form.beanName,
          params: this.form.params,
          cronExpression: this.form.cronExpression,
          remark: this.form.remark,
          status: !this.form.id ? null : this.form.status
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
