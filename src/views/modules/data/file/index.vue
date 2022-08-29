<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item v-if="havePermission('configuration:list&file:updateConfig', '&')">
          <el-button
            v-permission="'file:updateConfig'"
            type="primary"
            @click="setHandle()">配置</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="文件名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.type" placeholder="存储类型" clearable>
            <el-option
              v-for="item in dictionaryList"
              :key="item.value"
              :value="item.value"
              :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-upload
            class="flex-box margin_l-12"
            :action="action"
            :headers="{
              [tokenKey]: tokenVal
            }"
            :show-file-list="false"
            :on-success="successHandle">
            <el-button type="primary">上传文件</el-button>
          </el-upload>
          <el-button-group class="margin-n-12" v-if="havePermission('file:delete')">
            <el-button @click="selectionHandle(1)">全选</el-button>
            <el-button @click="selectionHandle(2)">反选</el-button>
            <el-button @click="selectionHandle(0)">清除</el-button>
          </el-button-group>
          <el-button
            v-permission="'file:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-checkbox-group v-model="selection" class="flex-box flex_w-wrap">
        <div class="file-box height-150 width-150 margin_r-10 margin_b-10 margin_l-10" v-for="(item, index) in list" :key="item.id">
          <el-popover popper-class="file-popover" width="250px" :show-after="1000">
            <template #reference>
              <el-image
                class="height-full width-full"
                :src="item.url"
                :preview-src-list="urls"
                :initial-index="index"
                fit="contain"
                preview-teleported
                lazy />
            </template>
            <template #default>
              <div class="info-box font-size-12">
                <el-tooltip
                  effect="dark"
                  :content="item.original"
                  :show-after="500"
                  :hide-after="0"
                  placement="bottom">
                  <div class="ellipse">
                    <label>原名称：</label>
                    <span>{{ item.original }}</span>
                  </div>
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  :content="item.actual"
                  :show-after="500"
                  :hide-after="0"
                  placement="bottom">
                  <div class="ellipse">
                    <label>实际名称：</label>
                    <span>{{ item.actual }}</span>
                  </div>
                </el-tooltip>
                <div class="ellipse"><label>大小：</label><span>{{ item.size }} 字节</span></div>
                <div class="ellipse"><label>上传时间：</label><span>{{ item.created_at }}</span></div>
              </div>
            </template>
          </el-popover>
          <el-checkbox :label="item.id">&nbsp;</el-checkbox>
          <Iconfont
            v-if="havePermission('file:delete')"
            class="cursor-pointer"
            size="16px"
            name="delete"
            @click="deleteHandle(item.id)" />
        </div>
      </el-checkbox-group>
      <Setups ref="refSetups" v-if="visible" />
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAdministratorStore } from '@stores/administrator'

import { ElMessage, ElMessageBox } from 'element-plus'
import Setups from './components/setups.vue'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { TOKEN_KEY, SUCCESS_CODE } from '@/utils/constant'
import { clearJson, parseDate2Str, havePermission } from '@/utils'

import { pageApi, delApi, uploadApi } from '@/api/file'

const administratorStore = useAdministratorStore()

const { tokenVal } = storeToRefs(administratorStore)

const { page } = usePage()
page.size = 30
const { dictionaryMap, dictionaryList, getDictionary } = useDictionary()

const refForm = ref()
const refTable = ref()
const refSetups = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  name: '',
  type: '',
  date: []
})
const list = ref([])
const urls = ref([])
const selection = ref([])
const action = ref(uploadApi())
const tokenKey = ref(TOKEN_KEY)

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const getList = () => {
  const params = {
    ...form,
    start: form.date && form.date.length ? parseDate2Str(form.date[0]) : '',
    end: form.date && form.date.length ? parseDate2Str(form.date[1]) : '',
    current: page.current,
    size: page.size
  }
  loading.value = true
  pageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
      urls.value = list.value.map(item => item.url)
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

/**
* @description: 重新获取、重置 数据
* @param {*}
* @return {*}
* @author: gumingchen
*/
const reacquireHandle = () => {
  page.current = 1
  getList()
}

/**
* @description: 配置弹窗
* @param {*}
* @return {*}
* @author: gumingchen
*/
const setHandle = () => {
  visible.value = true
  nextTick(() => {
    refSetups.value.init()
  })
}

/**
* @description: 删除
* @param {number} id
* @return {*}
* @author: gumingchen
*/
const deleteHandle = id => {
  const ids = id ? [id] : selection.value
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    delApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        getList()
      }
    })
  }).catch(() => {
    // to do something on canceled
  })
}

/**
* @description: 上传文件成功回调
* @param {number} id
* @return {*}
* @author: gumingchen
*/
const successHandle = (r) => {
  if (SUCCESS_CODE.includes(r.code)) {
    getList()
  } else {
    ElMessage({
      message: r.message,
      type: 'warning'
    })
  }
}

/**
* @description: table多选事件
* @param {*} val
* @return {*}
* @author: gumingchen
*/
const selectionHandle = val => {
  switch (val) {
    case 1:
      selection.value = list.value.map(item => item.id)
      break
    case 2:
      selection.value = list.value.filter(item => !selection.value.includes(item.id)).map(item => item.id)
      break
    case 0:
      selection.value = []
      break
  }
}

/**
* @description: 分页变化事件
* @param {*}
* @return {*}
* @author: gumingchen
*/
const pageChangeHandle = argPage => {
  page.current = argPage.current
  page.size = argPage.size
  getList()
}

onBeforeMount(() => {
  getDictionary('oss')
  getList()
})
</script>

<style lang="scss" scoped>
.file-box {
  position: relative;
  border: 1px dotted var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  .el-checkbox {
    position: absolute;
    top: 5px;
    left: 5px;
    height: unset;
  }
  .iconfont {
    position: absolute;
    top: 5px;
    right: 5px;
    height: 16px;
    display: none;
    color: var(--el-color-danger);
    line-height: 16px;
  }
  &:hover {
    .iconfont {
      display: inline;
    }
  }
}
</style>
