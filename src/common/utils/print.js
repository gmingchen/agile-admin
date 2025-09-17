import dayjs from 'dayjs'

const getPrefix = () => {
  let result = `🚀【${ dayjs().format('HH:mm:ss.SSS') }】`
  return result
}

const normalize = (title, ...args) => {
  return [
    getPrefix(),
    `【${ title }】=>`,
    ...args
  ]
}

const log = (type, title, ...args) => {
  console[type](...normalize(title, ...args))
}

/**
 * 打印
 * @param  {...any} args args[0]: 标题
 */
export const printLog = (...args) => log('log', ...args)
export const printDebug = (...args) => log('debug', ...args)
export const printWarn = (...args) => log('warn', ...args)
export const printError = (...args) => log('error', ...args)
export const print = printDebug
