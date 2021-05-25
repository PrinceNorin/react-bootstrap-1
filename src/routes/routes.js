import { AppLayout, GlobalLayout } from '~/layouts';
import SignIn from '~/pages/SignIn';
import Home from '~/pages/Home';

export const routes = [
  {
    component: Home,
    exact: true,
    path: '/',
    isPrivate: true,
    layout: AppLayout
  },
  {
    component: SignIn,
    exact: true,
    path: '/login',
    layout: GlobalLayout
  }
];

export default routes;
