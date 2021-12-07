import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Axios from '../views/Axios.vue';
import NotFound from '../views/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Axios',
    component: Axios,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
