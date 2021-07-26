
const routes = [
  {
    path: '/',
    component: () => import('layouts/WalletLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('pages/Index.vue')
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
