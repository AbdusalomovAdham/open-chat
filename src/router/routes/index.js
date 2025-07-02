// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/auth',
    component: () => import('@/layouts/auth/index'),
    name: 'auth-layout',
    children: [
      {
        path: 'sign-in',
        component: () => import('@/pages/auth/sign-in/index.vue')
      },
      {
        path: 'sign-up',
        component: () => import('@/pages/auth/sign-up/index.vue')
      },
      {
        path: 'reset/password',
        component: () => import('@/pages/auth/reset-psw/index.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/layouts/user/index.vue'),
    name: 'user-layout',
    children: [
      {
        path: '/user/chats',
        component: () => import('@/pages/user/chats/index.vue'),
        name:'user-chats'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
