
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
      {
        path: 'kyc',
        name: 'Kyc',
        component: () => import('pages/Kyc.vue'),
        meta: true,
        children: [
          {
            path: '',
            name: 'KycRoot',
            component: () => import('pages/kyc/KycRoot.vue')
          },
          {
            path: ':id',
            name: 'UserKycInfo',
            component: () => import('pages/kyc/UserKycInfo.vue')
          }
        ]
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
