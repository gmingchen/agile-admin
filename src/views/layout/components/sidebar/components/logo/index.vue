<script setup>
const props = defineProps({
  collapse: {
    type: Boolean,
    default: () => true
  }
})

const adminerStore = useAdminerStore()

const { tenant } = storeToRefs(adminerStore)
</script>

<template>
  <div
    class="logo-container padding-n-10 width-full flex"
    v-if="tenant.name || tenant.logo">
    <transition name="el-fade-in" mode="out-in">
      <div class="flex flex-item_f-1 flex_j_c-center flex_a_i-center" v-if="!collapse">
        <el-image class="width-34 height-34" :src="tenant.logo" />
        <div class="margin_l-10 ellipse">
          {{ tenant.name }}
        </div>
      </div>
      <div class="flex flex-item_f-1 flex_j_c-center flex_a_i-center" v-else>
        <el-image class="width-34 height-34" :src="tenant.logo" v-if="tenant.logo" />
        <div class="margin_l-10 ellipse" v-else>
          {{ tenant.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  height: var(--gl-headbar-height);
  line-height: var(--gl-headbar-height);
  background-color: var(--gl-sidebar-background-color);
  transition: width 0.4s;
}
</style>
