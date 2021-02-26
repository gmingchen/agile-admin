<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-26 15:12:43
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
    <el-form :model="form" :rules="rules" ref="formRef" @keyup.enter="submit()" label-width="80px">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="(type, index) in form.typeList" :label="index" :key="index">{{ type }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="form.typeList[form.type] + '名称'" prop="name">
        <el-input v-model="form.name" :placeholder="form.typeList[form.type] + '名称'"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <el-cascader ref="cascaderRef" v-model="form.parentId" :options="menuList" :props="menuListProps" :show-all-levels="false"></el-cascader>
      </el-form-item>
      <el-form-item v-if="form.type === 1 || form.type === 2" label="菜单路由" prop="url">
        <el-input v-model="form.url" placeholder="菜单路由"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type !== 0" label="授权标识" prop="perms">
        <el-input v-model="form.perms" placeholder="多个用逗号分隔, 如: user:list,user:create"></el-input>
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input-number v-model="form.orderNum" controls-position="right" :min="0" label="排序号"></el-input-number>
      </el-form-item>
      <el-form-item v-if="form.type !== 2" label="菜单图标" prop="icon">
        <el-popover trigger="click" placement="bottom" popper-class="popper-menu-add-or-edit" width="330px">
          <div class="icon-wrap">
            <el-button type="text" @click="form.icon = ''">清除</el-button>
            <br />
            <el-button
              v-for="(item, index) in form.iconList"
              :key="index"
              :class="{ 'is-active': item === form.icon }"
              size="mini"
              class="icon-btn"
              @click="iconActiveHandle(item)"
            >
              <svg-icon :name="item"></svg-icon>
            </el-button>
          </div>
          <template #reference>
            <el-input v-model="form.icon" placeholder="菜单图标名称" readonly></el-input>
          </template>
        </el-popover>
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

  protected checkUrl = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    if (this.form.type === 1 && !/\S/u.test(value)) {
      callback(new Error('菜单URL不能为空'))
    } else {
      callback()
    }
  }

  protected form = {
    id: 0,
    type: 1,
    typeList: ['目录', '菜单', '按钮'],
    name: '',
    parentId: [0],
    parentName: '',
    url: '',
    perms: '',
    orderNum: 0,
    icon: '',
    iconList: []
  }
  protected rules = {
    name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
    parentId: [{ required: true, message: '上级菜单不能为空', trigger: 'change' }],
    url: [{ validator: this.checkUrl, trigger: 'blur' }]
  }
  protected menuList: Array<IObject> = []
  protected menuListProps = {
    checkStrictly: true,
    value: 'id',
    label: 'name',
    children: 'children'
  }

  created() {
    this.form.iconList = Icon.getNameList() as never[]
  }

  /**
   * @description: 初始化事件
   * @param {number} key
   * @return {*}
   * @author: gumingchen
   */
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
          type: this.form.type,
          name: this.form.name,
          parentId: typeof this.form.parentId === 'number' ? this.form.parentId : this.form.parentId[this.form.parentId.length - 1],
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
