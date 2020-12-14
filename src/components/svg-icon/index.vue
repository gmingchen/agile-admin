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
/**
 * svg-icon全局组件
 * @module global-svg-icon
 */

export default {
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
  computed: {
    /**
     * icon 名称处理
     * @event iconName
     */
    iconName () {
      return `#icon-${this.name}`
    },
    /**
     * icon 样式处理
     * @event iconClass
     */
    iconClass () {
      if (this.svgClass) {
        return 'svg-icon-set ' + this.svgClass
      } else {
        if (this.size) {
          return 'svg-icon-set '
        } else {
          return 'svg-icon'
        }
      }
    }
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
