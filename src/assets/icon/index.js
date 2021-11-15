/*
 * @Description: 字体图标, 使用SVG Sprite矢量图标(http://www.iconfont.cn/）
 *               使用:
 *                  1. 在阿里矢量图标站创建一个项目, 并添加图标(非必须)
 *                  2. 添加icon, 选中新增的icon图标, 复制代码 -> 下载 -> SVG下载 -> 粘贴代码(重命名)
 *                  3. 组件模版中使用 [<gl-svg name="icon" size="100" color="red" svgClass="svg"></gl-svg>]
 *               注意:
 *                  1. {其中size为height,width; color为icon颜色; svgClass为css样式}- (非必填)
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-15 08:45:46
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 16:45:30
 */
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/u)
requireAll(req)

const svgFiles = require.context('./svg', true, /\.svg$/u)
const iconList = svgFiles.keys().map(item => {
  return item.slice(2, -4)
})

export default {
  // 获取图标(*).svg名称列表, 例如[shouye, xitong, zhedie, ...]
  getNames() {
    return iconList
  }
}
