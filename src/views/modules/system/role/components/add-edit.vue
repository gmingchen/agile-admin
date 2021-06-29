<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:58:28
-->
<template>
  <el-dialog
    width="500px"
    :title="t(!form.id ? 'button.add' : 'button.edit')"
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
      <el-form-item :label="t('field.fullName',[t('base.role.role')])" prop="name">
        <el-input v-model="form.name" :placeholder="t('field.fullName',[t('base.role.role')])" />
      </el-form-item>
      <el-form-item :label="t('field.remark')" prop="remark">
        <el-input v-model="form.remark" :placeholder="t('field.remark')" />
      </el-form-item>
      <el-form-item :label="t('base.role.auth')" prop="parent_id">
        <el-cascader
          ref="refCascader"
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
        <el-button @click="visible = false">{{ t('button.cancel') }}</el-button>
        <el-button type="primary" @click="submit()">{{ t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { key, useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import useInstance from '@/mixins/instance'
import { addApi, editApi, infoApi } from '@/api/system/role'
import { selfSelectListApi } from '@/api/develop/menu'
import { parseData2Tree } from '@/utils'

import { CascaderCheckedNode, CascaderProps } from 'Type/el'
import { Menu } from 'Type/menu'
import { Role } from 'Type/role'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, ctx) {
    const store = useStore(key)
    const { t } = useI18n()
    const { $message } = useInstance()

    const refForm = ref()
    const refCascader = ref()
    const data = reactive({
      visible: false,
      loading: false,
      menus: [] as Menu.Simple[],
      form: {
        id: null,
        name: '',
        remark: '',
        menu_ids: []
      } as Role.Dto
    })

    const rules = computed(() => {
      const rule = {
        name: [{ required: true, message: t('rule.notBlank', [t('field.fullName', [t('base.role.role')])]), trigger: 'blur' }]
      }
      nextTick(() => {
        refForm.value.clearValidate()
      })
      return rule
    })
    const language = computed(() => store.state.setting.set.language)
    const menusProps = computed((): CascaderProps => {
      const prop = {
        multiple: true,
        emitPath: false,
        checkStrictly: false,
        value: 'id',
        label: `name_${ language.value }`,
        children: 'children'
      }
      return prop
    })

    /**
     * @description: 初始化数据
     * @param {*} async
     * @return {*}
     * @author: gumingchen
     */
    const init = async (id?: number): Promise<void> => {
      data.visible = true
      data.loading = true
      data.form.id = id
      const res = await selfSelectListApi()
      if (res) {
        res.data.push({
          id: 0,
          parent_id: 0,
          name_cn: '一级菜单',
          name_en: 'First level menu',
          children: []
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
    const submit = (): void => {
      refForm.value.validate(async (valid: boolean) => {
        if (valid) {
          // 处理菜单权限ID
          const checkedNodes = refCascader.value.getCheckedNodes(true) as CascaderCheckedNode<number>[]
          let menuIds: number[] = []
          checkedNodes.forEach(item => {
            menuIds.push.apply(menuIds, item.pathValues)
          })
          menuIds = Array.from(new Set(menuIds)).filter(item => {
            return item !== 0
          })
          data.form.menu_ids = menuIds

          const r = !data.form.id ? await addApi(data.form) : await editApi(data.form)
          if (r) {
            data.visible = false
            $message({
              message: t('tip.success'),
              type: 'success'
            })
            ctx.emit('refresh')
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
    const dialogClosedHandle = (): void => {
      refForm.value.resetFields()
    }

    return {
      refForm,
      refCascader,
      ...toRefs(data),
      rules,
      menusProps,
      init,
      submit,
      dialogClosedHandle,
      t
    }
  }
})
</script>
