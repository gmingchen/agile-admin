<template>
  <el-dialog
    width="450px"
    title="修改"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="菜单权限" prop="menu_ids">
        <el-cascader
          class="width-full"
          ref="refCascader"
          v-model="form.menu_ids"
          :options="menus"
          :props="cascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          v-repeat
          type="primary"
          @click="submit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'

import { selectListApi } from '@/api/menu'
import { globalIdsApi, globalModifyApi } from '@/api/enterprise-menu'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const refForm = ref()
    const refCascader = ref()

    const data = reactive({
      visible: false,
      menus: [],
      form: {
        enterprise_id: null,
        menu_ids: []
      }
    })

    const rules = reactive(function() {
      return {
        menu_ids: [{ type: 'array', required: true, message: '请选择菜单权限', trigger: 'blur' }]
      }
    }())

    const cascaderProps = computed(() => {
      const reuslt = {
        multiple: true,
        emitPath: false,
        checkStrictly: false,
        value: 'id',
        label: `name_cn`,
        children: 'children'
      }
      return reuslt
    })

    const getMenu = async () => {
      const r = await selectListApi()
      if (r) {
        const list = [{
          id: 0,
          name_cn: '一级菜单',
          name_en: 'First level menu',
          parent_id: 0,
          children: r.data
        }]
        data.menus = list
      }
    }

    const getMenuId = async () => {
      const r = await globalIdsApi(data.form.enterprise_id)
      if (r) {
        data.form.menu_ids = r.data
      }
    }

    const init = async (enterpriseId) => {
      data.visible = true
      data.form.enterprise_id = enterpriseId
      await getMenu()
      await getMenuId()
    }

    /**
     * @description: 表单验证提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(valid => {
        if (valid) {
          // 处理已选 菜单 权限
          const checkedNodes = refCascader.value.getCheckedNodes(true)
          const menuIds = []
          checkedNodes.forEach(item => {
            menuIds.push.apply(menuIds, item.pathValues)
          })
          data.form.menu_ids = Array.from(new Set(menuIds)).filter(item => item !== 0)
          globalModifyApi(data.form).then(r => {
            if (r) {
              data.visible = false
              ElMessage({
                message: '操作成功!',
                type: 'success'
              })
              emit('refresh')
            }
          })
        }
      })
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

    return {
      refForm,
      refCascader,
      ...toRefs(data),
      rules,
      cascaderProps,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
