<template>
  <div
    class="logo-container padding-n-10 width-full flex-box"
    v-if="enterprise.name || enterprise.logo">
    <transition name="el-fade-in" mode="out-in">
      <div class="flex-box flex-item_f-1 flex_j_c-center flex_a_i-center" v-if="!collapse">
        <el-image class="width-34 height-34" :src="enterprise.logo" />
        <div class="margin_l-10 ellipse-1">
          {{ enterprise.name }}
        </div>
      </div>
      <div class="flex-box flex-item_f-1 flex_j_c-center flex_a_i-center" v-else>
        <el-image class="width-34 height-34" :src="enterprise.logo" v-if="enterprise.logo" />
        <div class="margin_l-10 ellipse-1" v-else>
          {{ enterprise.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useEnterpriseStore } from '@stores/enterprise'
import { useMenuStore } from '@stores/menu'

const props = defineProps({
  collapse: {
      type: Boolean,
      default: () => true
    }
})

const enterpriseStore = useEnterpriseStore()
const MenuStore = useMenuStore()

const { enterprise } = storeToRefs(enterpriseStore)
</script>

<style lang="scss" scoped>
.logo-container {
  height: var(--gl-headbar-height);
  line-height: var(--gl-headbar-height);
  background-color: var(--gl-sidebar-background-color);
  transition: width 0.4s;
}
</style>
