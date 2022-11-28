import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: "Games",
        component: () => import('../pages/Games.vue')
    },
    {
        path: '/store',
        name: "Store",
        children: [
            { path: 'accessories' },
            { path: 'bodies' },
            { path: 'faces' },
            { path: 'shoes' },
            { path: 'my-creations' }
          ],
        alias: "/store/all",
        component: () => import('../pages/Store.vue')
    },
    {
        path: '/avatar',
        name: "My Avatar",
        component: () => import('../pages/Avatar.vue')
    },
    {
        path: '/groups',
        name: "Groups",
        component: () => import('../pages/Groups.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router
