<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-01-14 13:30:55
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-15 15:53:35
-->
<template>
  <svg aria-hidden="true" :class="iconClass" :width="size" :height="size" :color="color">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang='ts'>

/**
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
 */
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'SvgIcon',

  /**
   * Props 接受父组件的传值
   * @prop {String} name icon 名称 必传
   * @prop {String} svgClass 自定义class name
   * @prop {String} size 大小
   * @prop {String} color 颜色
   */
  props: {
    name: {
      type: String,
      required: true
    },
    svgClass: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '16px'
    },
    color: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // icon 名称处理
    const iconName = computed(() => {
      return `#icon-${props.name}`
    })
    // icon 样式处理
    const iconClass = computed(() => {
      if (props.svgClass) {
        return 'svg-icon-set ' + props.svgClass
      } else {
        if (props.size) {
          return 'svg-icon-set '
        } else {
          return 'svg-icon'
        }
      }
    })
    return {
      iconName,
      iconClass
    }
  }
})
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
