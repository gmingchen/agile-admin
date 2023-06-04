import { havePermission } from '@/utils'
/**
 * @description: 权限控制指令
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export default {
  mounted: (el, binding, vnode) => {
    const permission = binding.value
    const result = havePermission(permission)
    const tagName = el.localName
    if (!result) {
      switch (tagName) {
        case 'button': // 按钮权限控制-删除tag
          el.remove()
          break
        case 'div': // element-plus switch 组件权限控制
          if (vnode.props && vnode.props.class && vnode.props.class.includes('el-switch')) {
            nextTick(() => {
              el.className += ' is-disabled' // 设置禁用样式
              const tag = el.cloneNode(true) // 深拷贝节点以解除绑定事件
              const parent = el.parentNode
              el.remove()
              parent.append(tag)
            })
          } else {
            el.remove()
          }
          break
        default:
          el.remove()
      }
    }
  }
}
