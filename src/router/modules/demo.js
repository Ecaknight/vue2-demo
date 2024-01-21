export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('@/views/AboutView.vue'),
  // },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/form.vue'),
  },
  {
    path: '/formValidate',
    name: 'formValidate',
    component: () => import('@/views/formValidate.vue'),
  },
  {
    path: '/formDemo',
    name: 'formDemo',
    component: () => import('@/views/formDemo.vue'),
  },
  {
    path: '/mulForm',
    name: 'mulForm',
    component: () => import('@/views/mulForm.vue'),
  },
];
