
const routes = [
  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('pages/Index.vue'),
        meta: {
          auth: false
        }
      },
      // kyc
      {
        path: 'user/:id',
        name: 'UserKycInfo',
        component: () => import('pages/users/UserInfo.vue')
      },
      // accounts
      {
        path: 'accounts',
        name: 'Accounts',
        component: () => import('pages/Accounts.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'accounts/users',
        name: 'Users',
        component: () => import('pages/Users.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'accounts/admin',
        name: 'Admin',
        component: () => import('pages/accounts/Admin.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'accounts/admin/add',
        name: 'AddAdmin',
        component: () => import('pages/accounts/admin/AddAdmin.vue'),
        meta: {
          auth: true
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
