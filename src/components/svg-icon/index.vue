<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-01-14 13:30:55
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-21 13:22:59
-->
<template>
  <svg aria-hidden="true" :class="iconClass" :width="size" :height="size" :color="color">
    <use :xlink:href="iconName" />
  </svg>
</template>
<!--
 * 使用:
 *   1.组件模版中使用
 *      [<svg-icon
 *            name="icon"
 *            size="100"
 *            color="red"
 *            svgClass="svg"></svg-icon>]
 * 注意:
 *    1.name      为svg图片名称，不需要扩展名 （必填）
 *    2.size      为svg高宽（默认1em）
 *    3.color     为svg颜色
 *    4.svgClass  为svg Class样式
-->
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Options({})
export default class extends Vue {
  // icon 名称 必传
  @Prop(String)
  name!: string
  // 自定义class name
  @Prop({ type: String, default: '' })
  svgClass?: string
  // size 大小
  @Prop({ type: String, default: '16px' })
  size?: string
  // color 颜色
  @Prop({ type: String, default: '' })
  color?: string

  /**
   * @description: 名称处理
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  get iconName(): string {
    const result: string = `#icon-${this.name}`
    return result
  }

  /**
   * @description: 样式处理
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  get iconClass(): string {
    let result: string
    if (this.svgClass) {
      result = 'svg-icon-set ' + this.svgClass
    } else {
      if (this.size) {
        result = 'svg-icon-set '
      } else {
        result = 'svg-icon'
      }
    }
    return result
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-icon-set {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
