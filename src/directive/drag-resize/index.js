/**
 * @description: 拖拽改变大小指令
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const horizontal = ['left', 'right']
const vertical = ['top', 'bottom']
const positions = [...horizontal, ...vertical]

// 默认参数
const defaultOptions = {
  // 拖拽位置
  position: positions[1],
  // 拖拽区域大小
  areaSize: '3px',
  // 拖拽区域背景色
  areaBackground: 'transparent',
  // Element的最小宽度/高度
  min: 200,
  // Element的最大宽度/高度
  max: 460,
  // 处理器
  downHandler: null,
  moveHandler: null,
  upHandler: null
}

const weakMap = new WeakMap()

/**
 * 拖拽区域位置处理
 * @param {*} div
 * @param {*} position
 */
const positionHandle = (div, position, size) => {
  // 水平方向
  if (horizontal.includes(position)) {
    div.style.top = '0px'
    div.style.bottom = '0px'
    div.style[position] = '0px'
    div.style.cursor = 'col-resize'
    div.style.width = size
  }
  // 垂直方向
  if (vertical.includes(position)) {
    div.style.right = '0px'
    div.style.left = '0px'
    div.style[position] = '0px'
    div.style.cursor = 'row-resize'
    div.style.height = size
  }
}

/**
 * 创建节点
 * @returns Element
 */
const createElement = (options) => {
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.userSelect = 'none'

  const { position, areaSize, areaBackground } = options

  positionHandle(div, position, areaSize)

  div.style.background = areaBackground

  return div
}

const mouseListener = (el, div, options) => {
  div.addEventListener('mousedown', (downEvent) => {
    const { downHandler, moveHandler, upHandler } = options
    if (typeof downHandler === 'function') {
      downHandler(downEvent)
    }
    const moveController = new AbortController()
    const upController = new AbortController()

    const width = el.offsetWidth
    const downPageX = downEvent.pageX

    const height = el.offsetHeight
    const downPageY = downEvent.pageY

    weakMap.set(el, { div, moveController, upController })

    document.addEventListener('mousemove', (moveEvent) => {
      if (typeof moveHandler === 'function') {
        moveHandler(moveHandler)
      }
      document.documentElement.style.cursor = div.style.cursor
      if (horizontal.includes(options.position)) {
        const value = moveEvent.pageX - downPageX
        const size = width + value
        if (size >= options.max) {
          return
        }
        if (size <= options.min) {
          return
        }
        el.style.width = size + 'px'
      }
      if (vertical.includes(options.position)) {
        const value = moveEvent.pageY - downPageY
        const size = width + value
        if (size >= options.max) {
          return
        }
        if (size <= options.min) {
          return
        }
        el.style.height = size + value + 'px'
      }
    }, { signal: moveController.signal })

    document.addEventListener('mouseup', () => {
      if (typeof upHandler === 'function') {
        upHandler(moveHandler)
      }
      moveController.abort()
      upController.abort()
      document.documentElement.style.cursor = ''
    }, { signal: upController.signal })
  })
}

export default {
  mounted(el, binding) {
    el.style.position = 'relative'
    const { arg, value } = binding

    const options = value ? { ...defaultOptions, ...value } : { ...defaultOptions }
    if (arg) {
      options.position = arg
    }

    if (!positions.includes(options.position)) {
      console.warn(`[Directive warn]: Invalid arg: validation failed for arg. Expected one of ${ JSON.stringify(positions) }, got value "${ options.position }".`)
      return
    }

    const div = createElement(options)

    mouseListener(el, div, options)

    el.appendChild(div)
  },
  unmounted(el) {
    const data = weakMap.get(el)
    if (data) {
      const { moveController, upController } = data
      moveController.abort()
      upController.abort()
      document.documentElement.style.cursor = ''
    }
  }
}

