/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-02 16:58:23
 */

import { IToken, IUser } from '@/api/login/index.type'

export interface IUserState {
  user: IUser
  token: IToken
}
