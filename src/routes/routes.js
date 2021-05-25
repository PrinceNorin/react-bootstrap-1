import { AppLayout, GlobalLayout } from '~/layouts';
import SignIn from '~/pages/SignIn';
import Home from '~/pages/Home';

export const routes = [
  {
    component: SignIn,
    exact: true,
    path: '/login',
    layout: GlobalLayout
  },
  {
    component: Home,
    path: '/',
    isPrivate: true,
    layout: AppLayout
  }
];

export default routes;
