
import HomePage from '../pages/home.vue';
import LoginPage from '../pages/login.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: LoginPage,
  },
  {
    path: '/home/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: LoginPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
