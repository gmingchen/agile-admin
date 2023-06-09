/**
 * @description: Element 尺寸变化监听指令
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const args = ['borderBoxSize', 'contentBoxSize', 'contentRect', 'devicePixelContentBoxSize']

const weakMap = new WeakMap()

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const value = weakMap.get(entry.target)
    if (value) {
      let { arg } = value
      arg = arg || args[1]
      let params = entry[arg]
      if (arg !== args[2]) {
        const { blockSize, inlineSize } = entry[arg][0]
        params = {
          height: blockSize,
          width: inlineSize
        }
      }
      value.handler(params)
    }
  }
})

export default {
  mounted(el, binding) {
    const { arg, value } = binding
    if (typeof value !== 'function') {
      console.warn('[Directive warn]: Invalid value: validation failed for value. Must be a function.')
      return
    }
    if (arg && !args.includes(arg)) {
      console.warn(`[Directive warn]: Invalid arg: validation failed for arg. Expected one of ${ JSON.stringify(args) }, got value "${ arg }".`)
      return
    }
    resizeObserver.observe(el)
    weakMap.set(el, { arg, handler: binding.value })
  },
  unmounted(el) {
    resizeObserver.unobserve(el)
  }
}
