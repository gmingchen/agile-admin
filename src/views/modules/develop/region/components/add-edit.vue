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
      <el-form-item label="中文" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="32" />
      </el-form-item>
      <el-form-item label="上级" prop="parent_id">
        <el-cascader
          ref="refCascader"
          v-model="form.parent_id"
          :props="regionProps"
          :show-all-levels="false" />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="form.code" placeholder="编码" maxlength="10" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button v-repeat type="primary" @click="submit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'

import useDictionary from '@/mixins/dictionary'
import { isInteger } from '@/utils/regular'

import { addApi, editApi, infoApi, selectListApi } from '@/api/develop/region'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const refForm = ref()
    const refCascader = ref()

    const { dictionaryList, getDictionaryList } = useDictionary()
    const data = reactive({
      visible: false,
      loading: false,
      regionProps: {
        emitPath: false,
        checkStrictly: true,
        value: 'id',
        label: `name`,
        children: 'children',
        lazy: true,
        lazyLoad: (node, resolve) => {
          const { level, value } = node
          if (level === 0) {
            resolve([{
              id: 0,
              name: '一级区域',
              level: 0,
              leaf: false,
              children: []
            }])
          } else {
            selectListApi(value).then(r => {
              if (r) {
                resolve(r.data.map(item => {
                  return {
                    ...item,
                    leaf: level === 2
                  }
                }))
              }
            })
          }
        }
      },
      form: {
        id: null,
        parent_id: 0,
        name: '',
        code: '',
        level: ''
      }
    })

    const rules = reactive(function () {
      const checkCode = (_rule, value, callback) => {
        if (!isInteger(value)) {
          callback(new Error('请输入整数'))
        } else {
          callback()
        }
      }
      return {
        parent_id: [{ required: true, message: '请选择上级', trigger: 'change' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ]
      }
    }())

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
      getDictionaryList('regionLevel')
      if (data.form.id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form.parent_id = r.data.parent_id
          data.form.name = r.data.name
          data.form.code = r.data.code
          data.form.level = r.data.level
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
          console.log(refCascader.value.getCheckedNodes()[0].data)
          const { level } = refCascader.value.getCheckedNodes()[0].data
          data.form.level = level + 1
          const r = !data.form.id ? await addApi(data.form) : await editApi(data.form)
          if (r) {
            data.visible = false
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
            emit('refresh')
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
    const dialogClosedHandle = () => {
      refForm.value.resetFields()
    }

    return {
      refForm,
      refCascader,
      dictionaryList,
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
