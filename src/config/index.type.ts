/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-29 10:02:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-18 14:28:48
 */
export enum ContentType {
  JSON = 'application/json;charset=UTF-8',
  FORM = 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD = 'multipart/form-data'
}

export enum PromptComponentType {
  MESSAGE = 'message',
  NOTIFY = 'notify',
  ALERT = 'alert'
}

export enum PromptMesssageType {
  SUCCESS = 'success',
  INFO = 'info',
  WARING = 'warning',
  ERROR = 'error'
}
