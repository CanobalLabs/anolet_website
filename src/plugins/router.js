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
            { path: 'accessories', name: "Store" },
            { path: 'bodies', name: "Store" },
            { path: 'faces', name: "Store" },
            { path: 'shoes', name: "Store" },
            { path: 'my-creations', name: "Store" }
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
