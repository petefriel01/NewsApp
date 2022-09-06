import { createRouter, createWebHistory } from 'vue-router';
import NewsIndex from '../views/NewsIndex.vue';
import NewsShow from '../views/NewsShow.vue';

const routes = [
    {
        path: '/',
        name: 'NewsIndex',
        component: NewsIndex,
        meta: { showLogo: true },
    },
    {
        path: '/news/:article?',
        name: 'NewsShow',
        component: NewsShow,
        meta: { showLogo: false },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
