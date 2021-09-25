
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
        path: 'kyc/:id',
        name: 'UserKycInfo',
        component: () => import('pages/users/UserKycInfo.vue')
      },
      // accounts
      {
        path: 'accounts',
        name: 'Accounts',
        component: () => import('pages/Accounts.vue'),
        meta: true,
      },
      {
        path: 'accounts/users',
        name: 'Users',
        component: () => import('pages/Users.vue'),
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
        component: () => import('pages/accounts/admin/AddAdmin.vue'),
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