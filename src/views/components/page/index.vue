<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-26 16:58:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-29 11:39:19
-->
<template>
  <el-pagination
    class="page"
    background
    layout="total, sizes, prev, pager, next, jumper, ->"

    :current-page="page.current"
    :page-sizes="page.sizes"
    :page-size="page.size"
    :total="page.total"
    @current-change="currentChangeHandle"
    @size-change="sizeChangeHandle" />
    <!-- :hide-on-single-page="page.total <= page.size" -->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { IPage } from '@/mixins/page'

@Options({
  emits: ['change']
})
export default class extends Vue {
  @Prop({
    type: Object,
    require: true
  })
  readonly page!: IPage

  currentChangeHandle(val: number): void {
    this.$emit('change', { current: val, size: this.page.size })
  }
  sizeChangeHandle(val: number): void {
    this.$emit('change', { current: this.page.current, size: val })
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 20px 0 0 0;
  text-align: center;
}
</style>
