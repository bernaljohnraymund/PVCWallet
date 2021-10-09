import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


export default function (/* { ssrContext } */) {
  const Store = createStore({
    plugins: [
      createPersistedState({
        storage: window.sessionStorage,
        key: '$vuex',
        paths: ['$user']
      })
    ],
    state () {
      return {
        $user: {}
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