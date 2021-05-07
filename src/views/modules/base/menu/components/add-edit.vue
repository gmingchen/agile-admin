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
      <el-form-item :label="t('field.type')">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">{{ t('base.menu.catalog') }}</el-radio>
          <el-radio :label="1">{{ t('base.menu.menu') }}</el-radio>
          <el-radio :label="2">{{ t('base.menu.button') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="t('field.fullName', [t('base.menu.chinese')])" prop="name_cn">
        <el-input v-model="form.name_cn" :placeholder="t('field.fullName', [t('base.menu.chinese')])" />
      </el-form-item>
      <el-form-item :label="t('field.fullName', [t('base.menu.english')])" prop="name_en">
        <el-input v-model="form.name_en" :placeholder="t('field.fullName', [t('base.menu.english')])" />
      </el-form-item>
      <el-form-item :label="t('base.menu.superior')" prop="parent_id">
        <el-cascader
          v-model="form.parent_id"
          :options="menus"
          :props="menusProps"
          :show-all-levels="false" />
      </el-form-item>
      <el-form-item v-if="form.type === 1 || form.type === 2" label="URL" prop="url">
        <el-input v-model="form.url" placeholder="URL" />
      </el-form-item>
      <el-form-item v-if="form.type !== 0" :label="t('base.menu.authMark')" prop="permission">
        <el-input v-model="form.permission" :placeholder="t('base.menu.authPlaceholder')" />
      </el-form-item>
      <el-form-item v-if="form.type !== 2" :label="t('field.sort')" prop="sort">
        <el-input-number
          v-model="form.sort"
          controls-position="right"
          :min="0"
          :label="t('field.sort')" />
      </el-form-item>
      <el-form-item v-if="form.type !== 2" :label="t('field.icon')" prop="icon">
        <el-popover
          trigger="click"
          placement="bottom"
          popper-class="popper-menu-add-edit"
          width="330px">
          <div class="icon-wrap">
            <el-button type="text" @click="form.icon = ''">{{ t('button.clear') }}</el-button>
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
            <el-input v-model="form.icon" :placeholder="t('field.icon')" readonly />
          </template>
        </el-popover>
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
import { computed, defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { key, useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import useInstance from '@/mixins/instance'
import { add, edit, getInfo, getSelect } from '@/api/base/menu'
import { parseData2Tree } from '@/utils'
import Icon from '@/assets/icon'

import { CascaderProps } from 'Type/el'
import { Menu } from 'Type/menu'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, ctx) {
    const store = useStore(key)
    const { t } = useI18n()
    const { $message } = useInstance()

    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      icons: [] as string[],
      menus: [] as Menu.Simple[],
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
      } as Menu.Dto
    })

    const rules = computed(() => {
      const checkUrl = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
        if (data.form.type === 1 && !/\S/u.test(value)) {
          callback(new Error(t('rule.notBlank', ['URL'])))
        } else {
          callback()
        }
      }
      const rule = {
        name_cn: [{ required: true, message: t('rule.notBlank', [t('field.fullName', [t('base.menu.chinese')])]), trigger: 'blur' }],
        name_en: [{ required: true, message: t('rule.notBlank', [t('field.fullName', [t('base.menu.english')])]), trigger: 'blur' }],
        parent_id: [{ required: true, message: t('rule.notBlank', [t('base.menu.superior')]), trigger: 'change' }],
        url: [{ validator: checkUrl, trigger: 'blur' }]
      }
      nextTick(() => {
        refForm.value.clearValidate()
      })
      return rule
    })
    const language = computed(() => store.state.setting.set.language)
    const menusProps = computed((): CascaderProps => {
      const prop = {
        emitPath: false,
        checkStrictly: true,
        value: 'id',
        label: `name_${ language.value }`,
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
    const init = async (id?: number): Promise<void> => {
      data.visible = true
      data.loading = true
      data.form.id = id
      const res = await getSelect()
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
        const r = await getInfo(data.form.id)
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
          const r = !data.form.id ? await add(data.form) : await edit(data.form)
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
     * @description: 图标选中事件
     * @param {string} icon
     * @return {*}
     * @author: gumingchen
     */
    const iconActiveHandle = (icon: string): void => {
      data.form.icon = icon
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
      dialogClosedHandle,
      t
    }
  }
})
</script>
