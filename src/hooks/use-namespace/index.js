// block 块 element 元素 modifier 修饰 state 状态
// n-button n-button__element n-button__element--disabled
// is-checked is-actived

export const defaultNamespace = ''
const statePrefix = 'is-'

const _bem = (
  namespace,
  block,
  blockSuffix,
  element,
  modifier
) => {
  let cls = `${namespace ? namespace + '-' : ''}${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const useNamespace = (block) => {
  const namespace = defaultNamespace
  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '')
  const e = (element) => (element ? _bem(namespace, block, '', element, '') : '')
  const m = (modifier) => (modifier ? _bem(namespace, block, '', '', modifier) : '')

  const be = (blockSuffix, element) =>
    blockSuffix && element ? _bem(namespace, block, blockSuffix, element, '') : ''
  const bm = (blockSuffix, modifier) =>
    blockSuffix && modifier ? _bem(namespace, block, blockSuffix, '', modifier) : ''
  const em = (element, modifier) =>
    element && modifier ? _bem(namespace, block, '', element, modifier) : ''
  const bem = (blockSuffix, element, modifier) =>
    blockSuffix && element && modifier ? _bem(namespace, block, blockSuffix, element, modifier) : ''

  const is = (name, state = true) =>
    state ? `${statePrefix}${name}` : ''

  return {
    namespace,
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
  }
}
