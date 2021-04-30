/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 17:23:32
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 17:47:52
 */
import { InjectionKey } from 'vue'
import { createStore, ModuleTree, Store, useStore as vuexUseStore } from 'vuex'
import { SettingStore, MenuStore, TabStore, UserStore } from './modules'
export interface RootState {
  setting: SettingStore
  menu: MenuStore
  tab: TabStore
  user: UserStore
}

const path = require('path')
const requireModules = require.context('./modules', true, /index\.(ts|js)$/iu)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modules: ModuleTree<any> = {}

requireModules.keys().forEach((filePath: string): void => {
  const modular = requireModules(filePath)
  let name = path.resolve(filePath, '..')
  name = name.split('/').pop()
  modules[name] = {
    namespaced: true,
    ...modular.default
  }
})

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore({
  modules: {
    ...modules
  }
})

export const useStore = vuexUseStore
