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
      // login
      {
        path: '',
        name: 'Index',
        component: () => import('pages/Index.vue'),
        meta: {
          auth: false
        }
      },
      // email verification
      {
        path: 'email-verification',
        name: 'EmailVerification',
        component: () => import('pages/EmailVerification.vue'),
        meta: {
          auth: false
        }
      },
      // dashboard
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          auth: true
        }
      },
      // profile
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('pages/Profile.vue'),
      },
      {
        path: 'profile/basic-information',
        name: 'BasicInformation',
        component: () => import('pages/profile/BasicInformation.vue'),
      },
      {
        path: 'profile/identity-information',
        name: 'IdentityInformation',
        component: () => import('pages/profile/IdentityInformation.vue'),
      },
      {
        path: 'profile/proof-of-address',
        name: 'ProofOfAddress',
        component: () => import('pages/profile/ProofOfAddress.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/Settings.vue'),
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
