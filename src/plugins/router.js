import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: "Home",
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/store',
        name: "Store",
        component: () => import('../pages/Store.vue')
    },
    {
        path: '/games',
        name: "Games",
        component: () => import('../pages/Games.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router