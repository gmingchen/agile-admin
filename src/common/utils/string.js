/**
 * 生成UUID
 * @returns {string}
 */
export const generateUUID = () => {
  let result = ''
  const code = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  result = code.replace(/[xy]/gu, item => {
    const random = (Math.random() * 16) | 0
    const value = item === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
  return result
}
