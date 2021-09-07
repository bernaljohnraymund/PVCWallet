import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import store from '../store';
const STORE = store()
import routes from './routes'

function $getUser () {
  return STORE.getters.getUser
}

const $user = $getUser();

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(function (to, from, next) {
    console.log()
    if (to.meta.auth === true && (!$user.hasOwnProperty('token'))) {
      next('/?route=login')
    }else
    if (to.meta.auth === false && ($user.hasOwnProperty('token') && $user.token.length > 0 && $user.token !== null)) {
      next('/dashboard')
    }else {
      next()
    }
  })

  return Router
})
