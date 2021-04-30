/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { ActionContext } from 'vuex'
import { $clearJson } from '@/utils/index'
import { getToken, setToken } from '@/utils/storage'
import { Token } from '@/types/token'
import { User } from '@/types/user'

export interface State {
  user: User.Vo
  token: Token.Base
}

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
    tokenVal: (state: State): string | null => {
      return state.token.token
    }
  },
  mutations: {
    SET_USER: (state: State, user: User.Vo): void => {
      state.user = user
    },
    SET_TOKEN: (state: State, token: Token.Base): void => {
      state.token = token
    },
    CLEAR_USER: (state: State): void => {
      $clearJson(state.user)
    },
    CLEAR_TOKEN: (state: State): void => {
      $clearJson(state.token)
    }
  },
  actions: {
    setUser({ commit }: ActionContext<State, null>, user: User.Vo): void {
      commit('SET_USER', user)
    },
    setToken({ commit }: ActionContext<State, null>, token: Token.Base): void {
      setToken(token.token)
      commit('SET_TOKEN', token)
    },
    clear({ commit }: ActionContext<State, null>, flag: boolean = false): void {
      if (flag) {
        commit('CLEAR_TOKEN')
      }
      commit('CLEAR_USER')
    }
  }
}
