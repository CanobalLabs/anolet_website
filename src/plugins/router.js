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
          ],
        alias: "/store/all",
        component: () => import('../pages/Store.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router
