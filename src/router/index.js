import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    meta: {
      title: 'Random Numbers',
    },
  },
];

routes.forEach((route) => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new VueRouter({
  // mode: 'history',
  routes,
});

export default router;
