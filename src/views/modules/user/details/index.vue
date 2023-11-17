<template>
  <ContainerCustom v-loading="loading">
    <template #default>
      <div class="user-details-container margin-10 flex flex_w-wrap">
        <div class="panel flex-item_f-2 margin-10 padding-30">
          <el-input v-model="value" placeholder="输入内容测试页面缓存" />
          <div class="flex flex_d-column flex_a_i-center">
            <el-avatar
              :size="120"
              :src="info.avatar"
              v-if="info.avatar" />
            <h2>{{ info.nickname }}</h2>
          </div>
          <el-descriptions :column="4" class="padding-n-30" border>
            <el-descriptions-item>
              <template #label>
                手机号
              </template>
              {{ info.mobile || '-'}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                邮箱
              </template>
              {{ info.email || '-'}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                性别
              </template>
              {{ info.sex_dict || '-' }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                状态
              </template>
              {{ info.status_dict || '-' }}
            </el-descriptions-item>
            <template v-if="info.auths">
              <template v-for="item in info.auths" :key="item.id">
                <el-descriptions-item>
                  <template #label>
                    授权方式
                  </template>
                  {{ item.identityType_dict || '-'}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    注册IP
                  </template>
                  {{ item.registeredIp || '-'}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    注册地址
                  </template>
                  {{ item.registeredAddress || '-'}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    注册时间
                  </template>
                  {{ item.registeredAt || '-'}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    最后登录IP
                  </template>
                  {{ item.logonIp || '-'}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    最后登录地址
                  </template>
                  {{ item.registeredAddress || '-'}}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                  <template #label>
                    最后登录时间
                  </template>
                  {{ item.logonAt || '-'}}
                </el-descriptions-item>
              </template>
            </template>
          </el-descriptions>
        </div>
      </div>
    </template>
  </ContainerCustom>
</template>

<script setup>
import { infoApi } from '@/api/user'

defineOptions({
  name: 'UserDetails'
})

const value = ref('')

const route = useRoute()

const loading = ref(false)
const info = ref({})

/**
 * @description: 获取信息
 * @param {*}
 * @return {*}
 */
const getInfo = (id) => {
  loading.value = true
  infoApi({ id }).then(r => {
    if (r) {
      info.value = r.data
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

onBeforeMount(() => {
  const { id } = route.query
  getInfo(id)
})
</script>

<style lang="scss" scoped>
.user-details-container {
  & > div:first-child {
    height: fit-content;
    min-width: 350px;
  }
  .panel {
    border-radius: var(--el-border-radius-base);
    background-color: var(--gl-content-panel-background-color);
  }
}
</style>
