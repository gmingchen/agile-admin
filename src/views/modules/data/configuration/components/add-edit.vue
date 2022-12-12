<template>
  <el-dialog
    width="500px"
    :title="form.id ? '编辑' : '新增'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" />
      </el-form-item>
      <el-form-item label="键" prop="json_key">
        <el-input v-model="form.json_key" placeholder="键" />
      </el-form-item>
      <el-form-item label="Json值" prop="json_value">
        <!-- <el-input v-model="form.json_value" placeholder="Json值" type="textarea" /> -->
        <Codemirror class="codemirror" v-model:value="form.json_value" :options="options" />
      </el-form-item>
      <el-form-item label="类型值" prop="type">
        <el-input-number
          v-model="form.type"
          :min="0"
          controls-position="right" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="item.value" v-for="item in dictionaryList" :key="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注" type="textarea" />
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
import { defineComponent, nextTick, reactive, ref, toRefs, onBeforeMount } from 'vue'

import { ElMessage } from 'element-plus'

import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'

import useDictionary from '@/mixins/dictionary'

import { infoApi, addApi, editApi } from '@/api/configuration'

export default defineComponent({
  emits: ['refresh'],
  components: { Codemirror },
  setup(_props, { emit }) {
    const refForm = ref()

    const { dictionaryList, getDictionary } = useDictionary()
    const data = reactive({
      visible: false,
      loading: false,
      form: {
        id: '',
        name: '',
        json_key: '',
        json_value: '',
        type: 0,
        remark: '',
        status: 0
      },
      options: {
        mode: 'application/json',
        theme: 'dracula',
        readOnly: false,
        lineNumbers: true,
        lineWrapping: true,
        autocorrect: true,
        spellcheck: true,
        smartIndent: true,
        indentUnit: 2,
        foldGutter: true,
        styleActiveLine: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
      }
    })

    const rules = reactive(function() {
      return {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        json_key: [{ required: true, message: '请输入键', trigger: 'blur' }],
        json_value: [{ required: true, message: '请输入Json值', trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型值', trigger: 'blur' }]
      }
    }())

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      if (id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form.id = r.data.id
          data.form.name = r.data.name
          data.form.json_key = r.data.json_key
          data.form.json_value = JSON.stringify(JSON.parse(r.data.json_value), null, '\t')
          data.form.type = r.data.type
          data.form.remark = r.data.remark
          data.form.status = r.data.status
        }
      }
      nextTick(() => { data.loading = false })
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
          const params = {
            ...data.form,
            json_value: JSON.stringify(JSON.parse(data.form.json_value))
          }
          const r = data.form.id ? await editApi(params) : await addApi(params)
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

    onBeforeMount(() => {
      getDictionary('status')
    })

    return {
      refForm,
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

<style lang="scss" scoped>
.codemirror {
  height: 200px;
  line-height: 18px;
}
</style>
