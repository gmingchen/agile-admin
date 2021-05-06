/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-30 11:19:00
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 13:20:30
 */
export namespace Token {

  export interface Base {
    user_id: number
    token: string
    expired_at: string
    updated_at: string
  }
  
}
