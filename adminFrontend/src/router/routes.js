
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
        path: 'kyc',
        name: 'Kyc',
        component: () => import('pages/Kyc.vue'),
        meta: true,
      },
      {
        path: 'kyc/:id',
        name: 'UserKycInfo',
        component: () => import('pages/kyc/UserKycInfo.vue')
      },
      // accounts
      {
        path: 'accounts',
        name: 'Accounts',
        component: () => import('pages/Accounts.vue'),
        meta: true,
      },
      {
        path: 'accounts/admin',
        name: 'Admin',
        component: () => import('pages/accounts/Admin.vue'),
        meta: true,
      },
      {
        path: 'accounts/admin/add',
        name: 'AddAdmin',
        component: () => import('pages/accounts/Admin/AddAdmin.vue'),
        meta: true,
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
