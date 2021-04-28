import { ActionContext, ModuleTree } from 'vuex'
export namespace Vuex {
  export type Module<R> = ModuleTree<R>
  export type Action<S, R> = ActionContext<S, R>
}