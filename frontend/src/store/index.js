import { createStore } from 'vuex'


export default function (/* { ssrContext } */) {
  const Store = createStore({
    state () {
      return {
        $user: {token: 'sdfasdf'}
      }
    },
    getters: {
      getUser: (state) => {
        return state.$user;
      }
    },
    mutations: {
      setUser (state, payload) {
        Object.assign(state.$user, payload);
      }
    },
    actions: {
      setUser ({ commit }, payload) {
        commit('setUser', payload);
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}