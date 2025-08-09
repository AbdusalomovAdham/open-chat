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
                name: 'user-chats',
                children: [
                    {
                        path: ':uid',
                        component: () => import('@/pages/user/chats/index.vue'),
                        name: 'user-chat'
                    }
                ]
            },

            {
                path: 'contacts',
                name: 'user-contacts',
                component: () => import('@/pages/user/contacts/index.vue'),
                children: [
                    {
                        path: ':uid',
                        component: () => import('@/pages/user/contacts/index.vue'),
                        name: 'contact-chat'
                    }
                ]
            },
            {
                path: 'contacts/:uid',
                component: () => import('@/pages/user/contacts/index.vue'),
            },
            {
                path: 'calls',
                component: () => import('@/pages/user/calls/index.vue'),
                name: 'calls',
                children: [
                    {
                        path: ':uid',
                        component: () => import('@/pages/user/calls/index.vue'),
                        name: 'user-calls',
                    }
                ]
            },
            {
                path: 'groups',
                component: () => import('@/pages/user/groups/index.vue'),
                name: 'groups',
                children: [
                    {
                        path: ':uid',
                        component: () => import('@/pages/user/groups/index.vue'),
                        name: 'user-groups',
                    }
                ]
            },
            {
                path: 'profile',
                component: () => import('@/pages/user/profile/index.vue'),
                name: 'profile',
                children: [
                    {
                        path: ':uid',
                        component: () => import('@/pages/user/profile/index.vue'),
                        name: 'user-profile',
                    }
                ]
            },
            {
                path: 'settings',
                component: () => import('@/pages/user/settings/index.vue'),
                name: 'settings',
                children: [
                    {
                        path: ':uid',
                        component: () => import('@/pages/user/settings/index.vue'),
                        name: 'user-setting',
                    }
                ]
            },
        ]
    },
    {
        path: '/logout',
        component: () => import('@/pages/user/logut/index.vue'),
        name: 'logout'
    }
]

export default routes