<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <Sidebar v-model="active" @change="changeHandle" />
    </template>
    <template #default>
      <div class="name-box margin_b-20 font-size-20">{{form.name_cn}}&nbsp;</div>
      <el-row v-show="active">
        <el-col
          :xs="24"
          :sm="24"
          :md="16"
          :lg="14"
          :xl="10">
          <el-form
            v-loading="loading"
            :model="form"
            :rules="rules"
            ref="refForm"
            @keyup.enter="submit()"
            label-position="top">
            <el-form-item label="中文名称" prop="name_cn">
              <el-input
                v-model="form.name_cn"
                placeholder="中文名称"
                maxlength="20"
                show-word-limit
                :readonly="!havePermission('\menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="英文名称" prop="name_en">
              <el-input
                v-model="form.name_en"
                placeholder="英文名称"
                maxlength="30"
                show-word-limit
                :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type" :disabled="!havePermission('menu:create|menu:update', '|')" @change="clearRouterParams">
                <el-radio-button
                  :label="item.value"
                  :disabled="buttonHandle(item.value)"
                  v-for="item in dictionaryList"
                  :key="item.value">{{item.label}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="组件Path（modules 为根目录可省略首个反斜杠，须省略组件文件的 .vue 后缀） / Http[s] URL" prop="url" v-if="form.type !== 0 && form.type !== 2">
              <el-input v-model="form.url" placeholder="路由Path / Http[s] URL" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="路由Path（若为空则按照url路径处理）" prop="path" v-if="form.type == 1">
              <el-input v-model="form.path" placeholder="路由Path" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="路由Name（若为空则按照url路径处理）" prop="name" v-if="form.type == 1">
              <el-input v-model="form.name" placeholder="路由Name" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="授权标识" prop="permission" v-if="form.type == 1 || form.type == 2">
              <el-input v-model="form.permission" placeholder="授权标识" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="图标" prop="icon" v-if="form.type !== 2">
              <IconSelectInput v-model="form.icon" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="form.sort"
                :min="1"
                controls-position="right"
                :disabled="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <template v-if="form.type === 1 || form.type === 3">
              <el-form-item label="是否在侧边菜单栏显示（如：个人中心，详情页都不需要显示）" prop="show">
                <el-radio-group v-model="form.show" :disabled="!havePermission('menu:create|menu:update', '|')">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否在tab页签显示" prop="tab">
                <el-radio-group v-model="form.tab" :disabled="!havePermission('menu:create|menu:update', '|')">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <template v-if="form.type === 1">
                <el-form-item label="是否支持tab页签多开（如：用户1的详情页、用户2的详情并存在tab页签）" prop="multiple">
                  <el-radio-group v-model="form.multiple" :disabled="!havePermission('menu:create|menu:update', '|')">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否支持缓存" prop="keepalive">
                  <el-radio-group v-model="form.keepalive" :disabled="!havePermission('menu:create|menu:update', '|')">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </template>
            </template>
            <el-form-item>
              <el-button v-permission="'menu:update'" type="primary" @click="submit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </template>
  </ContainerSidebar>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'
import ContainerSidebar from '@/components/container-sidebar/index.vue'
import Sidebar from './components/sidebar.vue'
import IconSelectInput from '@/components/icon-select-input/index.vue'

import useDictionary from '@/mixins/dictionary'
import { havePermission } from '@/utils'
import { VIRTUAL_ID_KEY } from './index.js'

import { infoApi, addApi, editApi } from '@/api/menu'

export default defineComponent({
  components: { ContainerSidebar, Sidebar, IconSelectInput },
  setup() {
    const refContainerSidebar = ref()
    const refForm = ref()
    const { dictionaryList, getDictionary } = useDictionary()
    const data = reactive({
      active: '',
      loading: false,
      form: {
        id: null,
        name_cn: '',
        name_en: '',
        path: '',
        name: '',
        url: '',
        permission: '',
        type: '',
        icon: '',
        show: 1,
        tab: 1,
        multiple: 0,
        keepalive: 0,
        sort: 1,
        parent_id: ''
      },
      row: null, // todo: 引用传递 用于编辑之后修改 列表数据
      parentType: 0 // 父级的类型
    })

    const rules = reactive(function() {
      const checkUrl = (_rule, value, callback) => {
        const types = [1, 3, 4]
        if (types.includes(data.form.type) && !value) {
          callback(new Error('请输入路由Path / Http[s] URL'))
        } else {
          callback()
        }
      }
      const checkPermission = (_rule, value, callback) => {
        const types = [2]
        if (types.includes(data.form.type) && !value) {
          callback(new Error('请输入授权标识'))
        } else {
          callback()
        }
      }
      const checkIcon = (_rule, value, callback) => {
        const types = [0, 1, 3, 4]
        if (types.includes(data.form.type) && !value) {
          callback(new Error('请输入授权标识'))
        } else {
          callback()
        }
      }
      return {
        name_cn: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
        name_en: [{ required: false, message: '请输入英文名称', trigger: 'blur' }],
        url: [
          { required: false, message: '请输入路由Path / Http[s] URL', trigger: 'blur' },
          { validator: checkUrl, trigger: 'blur' }
        ],
        permission: [
          { required: false, message: '请输入授权标识', trigger: 'blur' },
          { validator: checkPermission, trigger: 'blur' }
        ]
        // icon: [
        //   { required: false, message: '请选择图标', trigger: 'change' },
        //   { validator: checkIcon, trigger: 'blur' }
        // ]
      }
    }())

    const getInfo = async () => {
      data.loading = true
      const r = await infoApi(data.form.id)
      if (r) {
        data.form.name_cn = r.data.name_cn
        data.form.name_en = r.data.name_en
        data.form.path = r.data.path
        data.form.name = r.data.name
        data.form.url = r.data.url
        data.form.permission = r.data.permission
        data.form.type = r.data.type
        data.form.icon = r.data.icon || ''
        data.form.show = r.data.show
        data.form.tab = r.data.tab
        data.form.multiple = r.data.multiple
        data.form.keepalive = r.data.keepalive
        data.form.sort = r.data.sort
        data.form.parent_id = r.data.parent_id
      }
      nextTick(() => { data.loading = false })
    }

    const clearFrom = () => {
      data.form.id = null,
      data.form.name_cn = ''
      data.form.name_en = ''
      data.form.path = ''
      data.form.name = ''
      data.form.url = ''
      data.form.permission = ''
      data.form.icon = ''
      // refForm.value.resetFields()
    }

    const clearRouterParams = () => {
      data.form.show = 1
      data.form.tab = 1
      data.form.multiple = 0
      data.form.keepalive = 0
    }

    const changeHandle = ({ row, parentType }) => {
      refContainerSidebar.value.setScrollTop()
      data.row = row
      data.parentType = parentType
      if ((row.id + '').includes(VIRTUAL_ID_KEY)) {
        clearFrom()
        data.form.name_cn = row.name_cn
        data.form.name_en = row.name_en
        data.form.parent_id = row.parent_id
        data.form.type = row.type
        data.form.tab = 0
        data.form.sort = 1
      } else {
        data.form.id = row.id
        getInfo()
      }
    }

    const buttonHandle = (val) => {
      let result = false
      switch (data.parentType) {
        case 0:
          if (val === 2) {
            result = true
          }
          break
        case 1:
          if (val === 0 || val === 3 || val === 4) {
            result = true
          }
          break
      }
      return result
    }

    const submit = () => {
      refForm.value.validate(async valid => {
        if (valid) {
          const r = data.form.id ? await editApi(data.form) : await addApi(data.form)
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
            if (r.data) {
              data.row.id = r.data
              data.form.id = r.data
            }
            data.row.name_cn = data.form.name_cn
            data.row.name_en = data.form.name_en
            data.row.type = data.form.type
          }
          //
        }
      })
    }

    onBeforeMount(() => {
      getDictionary('menu')
    })

    return {
      refContainerSidebar,
      refForm,
      dictionaryList,
      ...toRefs(data),
      rules,
      clearRouterParams,
      changeHandle,
      buttonHandle,
      submit,
      havePermission
    }
  }
})
</script>

<style lang="scss" scoped>
.name-box {
  font-weight: bold;
}
</style>
