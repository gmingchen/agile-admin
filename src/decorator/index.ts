/*
 * @Description: 自定义装饰器
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-05 08:51:36
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-05 09:22:36
 */

import { createDecorator } from 'vue-class-component'

/**
 * @description: 日志
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export const Log = createDecorator((options, key) => {
  const originalMethod = options.methods[key]
  options.methods[key] = function wrapperMethod(...args) {
    console.log(`method:${key}\nargs:`, args)
    originalMethod.apply(this, args)
  }
})
