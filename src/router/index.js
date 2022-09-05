import { createRouter, createWebHistory } from 'vue-router';
import NewsIndex from '../views/NewsIndex.vue';
import NewsShow from '../views/NewsShow.vue';

const routes = [
    {
        path: '/',
        name: 'NewsIndex',
        component: NewsIndex,
    },
    {
        path: '/news/',
        name: 'NewsShow',
        component: NewsShow,
    },
    // {
    //     path: '/news/:newsid',
    //     name: 'NewsShow',
    //     component: NewsShow,
    // },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
