<script setup>
const props = defineProps({
  adminer: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="flex flex_d-column flex_a_i-center">
      <el-avatar
        :size="120"
        :src="adminer.avatar"
        v-if="adminer.avatar" />
      <h2>{{ adminer.nickname }}</h2>
    </div>
    <el-descriptions :column="2" class="padding-n-30">
      <el-descriptions-item>
        <template #label>
          <Iconfont name="account" />
        </template>
        {{ adminer.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Iconfont name="role" />
        </template>
        {{ adminer.role || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Iconfont name="mobile" />
        </template>
        {{ adminer.mobile || '-'}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Iconfont name="department" />
        </template>
        {{ adminer.dept || '-'}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Iconfont name="email" />
        </template>
        {{ adminer.email || '-'}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Iconfont name="sex" />
        </template>
        {{ adminer.role || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Iconfont name="sex" />
        </template>
        {{ adminer.sex_dict || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Iconfont name="post" />
        </template>
        {{ adminer.post || '-' }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
