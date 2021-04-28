/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-19 17:14:56
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-19 17:25:13
 */
import { Vue } from 'vue-class-component'

export interface IPage {
  current: number
  size: number
  total: number
  sizes: number[]
}

export default class extends Vue {
  protected page: IPage = {
    current: 1,
    size: 10,
    total: 0,
    sizes: [10, 20, 50, 100, 200]
  }
}
