
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
            },
        ]
    },
    {
        path: '/user',
        component: () => import('@/layouts/user/index.vue'),
        name: 'user-layout',
        children: [
            {
                path: 'chats',
                component: () => import('@/pages/user/chats/index.vue'),
                name: 'user-chats'
            },
            {
                path: 'contacts',
                component: () => import('@/pages/user/contacts/index.vue'),
                name: 'user-contacts'
            },
            {
                path: 'calls',
                component: () => import('@/pages/user/calls/index.vue'),
                name: 'user-calls'
            },
            {
                path: 'groups',
                component: () => import('@/pages/user/groups/index.vue'),
                name: 'user-groups'
            },
            {
                path: 'profile',
                component: () => import('@/pages/user/profile/index.vue'),
                name: 'user-profile'
            },
            {
                path: 'settings',
                component: () => import('@/pages/user/settings/index.vue'),
                name: 'user-settings'
            },
        ]
    },
    {
        path: '/logout',
        component: () => import('@/pages/user/logut/index.vue'),
        name: 'logout'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router