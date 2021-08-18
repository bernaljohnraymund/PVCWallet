import store from '../store'
// import mixins from '../boot/mixins'
// const $mixins = mixins()
// console.log($mixins)
const $store = store()
const $user = $store.getters.getUser
const routes = [
  {
    path: '/',
    component: () => import('layouts/WalletLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('pages/Index.vue'),
        meta: {
          auth: false
        }
      },
      {
        path: 'email-verification',
        name: 'EmailVerification',
        component: () => import('pages/EmailVerification.vue'),
        meta: {
          auth: false
        }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/Settings.vue'),
        children: [
          {
            path: '',
            name: 'SettingsRoot',
            component: () => import('pages/settings/Root.vue'),
          },
          {
            path: 'profile',
            name: 'Profile-Settings',
            component: () => import('pages/settings/Profile.vue'),
          }
        ],
        meta: {
          auth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
