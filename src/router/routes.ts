import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'materi', component: () => import('pages/MateriListPage.vue') },
      { path: 'materi/:id', component: () => import('pages/MateriDetailPage.vue') },
      { path: 'assessment', component: () => import('pages/AssessmentPage.vue') },
      { path: 'result', component: () => import('pages/ResultPage.vue') },
      { path: 'latihan', component: () => import('pages/LatihanMenuPage.vue') },
      { path: 'latihan/postur', component: () => import('pages/PosturePage.vue') },
      { path: 'latihan/peregangan', component: () => import('pages/StretchPage.vue') },
      { path: 'progress', component: () => import('pages/ProgressPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
