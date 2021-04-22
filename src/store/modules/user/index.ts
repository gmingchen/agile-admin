/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { IToken, IUser } from '@/api/login/index.type'
import { $clearJson } from '@/utils/index'
import { getToken, setToken } from '@/utils/storage'
import { ActionContext } from 'vuex'
import { IUserState } from './index.type'

export default {
  state: {
    user: {
      id: '',
      username: '',
      nickname: '',
      mobile: '',
      email: '',
      avatar: '',
      status: '',
      roles: []
    },
    token: {
      user_id: '',
      token: getToken(),
      expired_at: '',
      updated_at: ''
    }
  },
  getters: {
    tokenVal: (state: IUserState): string | null => {
      return state.token.token
    }
  },
  mutations: {
    SET_USER: (state: IUserState, user: IUser): void => {
      state.user = user
    },
    SET_TOKEN: (state: IUserState, token: IToken): void => {
      state.token = token
    },
    CLEAR_USER: (state: IUserState): void => {
      $clearJson(state.user)
    },
    CLEAR_TOKEN: (state: IUserState): void => {
      $clearJson(state.token)
    }
  },
  actions: {
    setUser({ commit }: ActionContext<IUserState, null>, user: IUser): void {
      commit('SET_USER', user)
    },
    setToken({ commit }: ActionContext<IUserState, null>, token: IToken): void {
      setToken(token.token)
      commit('SET_TOKEN', token)
    },
    clear({ commit }: ActionContext<IUserState, null>, flag: boolean = false): void {
      if (flag) {
        commit('CLEAR_TOKEN')
      }
      commit('CLEAR_USER')
    }
  }
}
