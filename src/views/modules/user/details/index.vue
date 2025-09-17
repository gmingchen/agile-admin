<template>
  <Container :class="n.b()">
    <div :class="n.e('wrap')">
      <div :class="n.e('panel')">
        <el-input v-model="value" placeholder="输入内容测试页面缓存" />
        <div class="f_d-column f_ai-center">
          <el-avatar v-if="data.avatar" :size="120" :src="data.avatar" />
          <h2>{{ data.nickname }}</h2>
        </div>
        <el-descriptions :column="4" class="padding-n-30" border>
          <el-descriptions-item>
            <template #label>手机号</template>
            {{ data.mobile || '-'}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>邮箱</template>
            {{ data.email || '-'}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>性别</template>
            {{ data.sex_dict || '-' }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>状态</template>
            {{ data.status_dict || '-' }}
          </el-descriptions-item>
          <template v-if="data.auths">
            <template v-for="item in data.auths" :key="item.id">
              <el-descriptions-item>
                <template #label>授权方式</template>
                {{ item.identityType_dict || '-'}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>注册IP</template>
                {{ item.registeredIp || '-'}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>注册地址</template>
                {{ item.registeredAddress || '-'}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>注册时间</template>
                {{ item.registeredAt || '-'}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>最后登录IP</template>
                {{ item.logonIp || '-'}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>最后登录地址</template>
                {{ item.registeredAddress || '-'}}
              </el-descriptions-item>
              <el-descriptions-item :span="2">
                <template #label>最后登录时间</template>
                {{ item.logonAt || '-'}}
              </el-descriptions-item>
            </template>
          </template>
        </el-descriptions>
      </div>
    </div>
  </Container>
</template>

<script setup>
import { Container } from '@/components'
import { userInfoApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('details')

const route = useRoute()

const value = ref('')

const loading = ref(false)
const data = ref({})

const getData = () => {
  loading.value = true
  const { id } = route.query
  userInfoApi({ id }).then(r => {
    if (r) {
      data.value = r
    }
    nextTick(() => loading.value = false)
  })
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: details#{$element-separator};
@include b(details) {
  @include e(wrap) {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    & > div:first-child {
      height: fit-content;
      min-width: 350px;
    }
  }
  @include e(panel) {
    margin: 10px;
    padding: 30px;
    flex: 2;
    border-radius: var(--el-border-radius-base);
  }
}
</style>
