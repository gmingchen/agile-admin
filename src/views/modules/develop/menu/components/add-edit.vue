<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:50:58
-->
<template>
  <el-dialog
    width="500px"
    :title="!form.id ? '新增' : '编辑'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      v-loading="loading"
      ref="refForm"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">目录</el-radio>
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="中文名称" prop="name_cn">
        <el-input v-model="form.name_cn" placeholder="中文名称" />
      </el-form-item>
      <el-form-item label="英文名称" prop="name_en">
        <el-input v-model="form.name_en" placeholder="英文名称" />
      </el-form-item>
      <el-form-item label="上级" prop="parent_id">
        <el-cascader
          v-model="form.parent_id"
          :options="menus"
          :props="menusProps"
          :show-all-levels="false" />
      </el-form-item>
      <el-form-item v-if="form.type === 1 || form.type === 2" label="URL" prop="url">
        <el-input v-model="form.url" placeholder="URL" />
      </el-form-item>
      <el-form-item v-if="form.type !== 0" label="授权标识" prop="permission">
        <el-input v-model="form.permission" placeholder="授权标识" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="form.sort"
          controls-position="right"
          :min="0"
          label="排序" />
      </el-form-item>
      <el-form-item v-if="form.type !== 2" label="图标" prop="icon">
        <el-popover
          trigger="click"
          placement="bottom"
          popper-class="popper-menu-add-edit"
          width="330px">
          <div class="icon-wrap">
            <gl-button sort="clear" type="text" @click="form.icon = ''" />
            <br>
            <el-button
              v-for="(item, index) in icons"
              :key="index"
              :class="{ 'is-active': item === form.icon }"
              size="mini"
              class="icon-btn"
              @click="iconActiveHandle(item)">
              <gl-svg :name="item" />
            </el-button>
          </div>
          <template #reference>
            <el-input v-model="form.icon" placeholder="图标" readonly />
          </template>
        </el-popover>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <gl-button sort="cancel" @click="visible = false" />
        <gl-button
          sort="confirm"
          v-repeat
          type="primary"
          @click="submit()" />
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import useInstance from '@/mixins/instance'
import { addApi, editApi, infoApi, selectListApi } from '@/api/develop/menu'
import { parseData2Tree } from '@/utils'
import Icon from '@/assets/icon'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const { $message } = useInstance()

    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      icons: [],
      menus: [],
      form: {
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
    })

    const rules = reactive(function () {
      const checkUrl = (_rule, value, callback) => {
        if (data.form.type === 1 && !/\S/u.test(value)) {
          callback(new Error('请输入URL'))
        } else {
          callback()
        }
      }
      return {
        name_cn: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
        name_en: [{ required: true, message: '请输入英文名称', trigger: 'blur' }],
        parent_id: [{ required: true, message: '请选择上级', trigger: 'change' }],
        url: [{ validator: checkUrl, trigger: 'blur' }]
      }
    }())

    const menusProps = computed(() => {
      const prop = {
        emitPath: false,
        checkStrictly: true,
        value: 'id',
        label: `name_cn`,
        children: 'children'
      }
      return prop
    })

    /**
     * @description: 初始化数据
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      const res = await selectListApi()
      if (res) {
        res.data.push({
          id: 0,
          parent_id: 0,
          name_cn: '一级菜单',
          name_en: 'First level menu'
        })
        data.menus = parseData2Tree(res.data, 'id', 'parent_id')
      }
      if (data.form.id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form = r.data
        }
      }
      nextTick(() => {
        data.loading = false
      })
    }

    /**
     * @description: 表单验证提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(async valid => {
        if (valid) {
          const r = !data.form.id ? await addApi(data.form) : await editApi(data.form)
          if (r) {
            data.visible = false
            $message({
              message: '操作成功!',
              type: 'success'
            })
            emit('refresh')
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
    const iconActiveHandle = icon => {
      data.form.icon = icon
    }

    /**
     * @description: 弹窗关闭动画结束时的回调
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const dialogClosedHandle = () => {
      refForm.value.resetFields()
    }

    onBeforeMount(() => {
      data.icons = Icon.getNames()
      init()
    })

    return {
      refForm,
      ...toRefs(data),
      rules,
      menusProps,
      init,
      submit,
      iconActiveHandle,
      dialogClosedHandle
    }
  }
})
</script>
