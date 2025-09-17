<template>
  <transition name="el-fade-in" mode="out-in">
    <div v-if="!collapse" :class="n.b()">
      <el-image v-if="logo" :class="n.e('logo')" :src="logo" />
      <div :class="n.e('name')">{{ name }}</div>
    </div>
    <div v-else :class="n.b()">
      <el-image v-if="logo" :class="n.e('logo')" :src="logo" />
      <div v-else :class="n.e('name')">{{ name }}</div>
    </div>
  </transition>
</template>

<script setup>
import { useAdminerStore } from '@/stores'
import { useNamespace } from '@/hooks'

const n = useNamespace('brand')

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false,
  }
})

const adminerStore = useAdminerStore()
const { tenant } = storeToRefs(adminerStore)
const name = computed(() => tenant.value.name)
const logo = computed(() => tenant.value.logo)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(brand) {
  display: flex;
  cursor: pointer;
  --size: 48px;

  @include e(logo) {
    width: var(--size);
    height: var(--size);
  }
  @include e(name) {
    margin-left: 10px;
    line-height: var(--size);
  }
}
</style>
