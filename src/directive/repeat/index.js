/**
 * @description: 表单防止重复提交指令
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export default {
  mounted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
}
