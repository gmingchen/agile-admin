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

// 初始化数据
let data = {
  el: null,
  dom: null,
  options: null,

  width: null,
  downPageX: null,
  height: null,
  downPageY: null
}

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

/**
 * 鼠标移动监听事件
 * @param {*} event
 * @returns
 */
const moveHandle = (event) => {
  const { el, dom, options, width, downPageX, height, downPageY } = data
  const { moveHandler, position, max, min } = options
  // 事件回调
  if (typeof moveHandler === 'function') {
    moveHandler(event)
  }
  // 设置鼠标样式
  document.documentElement.style.cursor = dom.style.cursor
  // 水平方向处理
  if (horizontal.includes(position)) {
    const value = position === horizontal[0] ? downPageX - event.pageX : event.pageX - downPageX
    const size = width + value
    if (size >= max) {
      return
    }
    if (size <= min) {
      return
    }
    el.style.width = size + 'px'
  }
  // 垂直方向处理
  if (vertical.includes(position)) {
    const value = position === vertical[0] ? downPageY - event.pageY : event.pageY - downPageY
    const size = height + value
    if (size >= max) {
      return
    }
    if (size <= min) {
      return
    }
    el.style.height = size + 'px'
  }
}
/**
 * 鼠标松开监听事件
 * @param {*} event
 */
const upHandle = (event) => {
  // 事件回调
  const { upHandler } = data.options
  if (typeof upHandler === 'function') {
    upHandler(event)
  }
  // 移除监听
  document.removeEventListener('mousemove', moveHandle)
  document.removeEventListener('mouseup', upHandle)
  // 移除鼠标样式
  document.documentElement.style.cursor = ''
}

/**
 * 鼠标按下事件
 * @param {*} el 当前节点
 * @param {*} dom 可拖拽节点
 * @param {*} options 参数
 */
const downListener = (el, dom, options) => {
  dom.addEventListener('mousedown', (event) => {
    // 事件回调
    const { downHandler } = options
    if (typeof downHandler === 'function') {
      downHandler(event)
    }
    // 获取水平参数
    const width = el.offsetWidth
    const downPageX = event.pageX
    // 获取垂直参数
    const height = el.offsetHeight
    const downPageY = event.pageY
    // 设置数据
    data = { el, dom, options, width, downPageX, height, downPageY }
    // 添加鼠标移动事件
    document.addEventListener('mousemove', moveHandle)
    // 添加鼠标松开事件
    document.addEventListener('mouseup', upHandle)
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

    const dom = createElement(options)

    downListener(el, dom, options)

    el.appendChild(dom)
  },
  unmounted() {
    // 移除监听
    document.removeEventListener('mousemove', moveHandle)
    document.removeEventListener('mouseup', upHandle)
    // 移除鼠标样式
    document.documentElement.style.cursor = ''
  }
}
