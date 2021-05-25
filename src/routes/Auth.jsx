import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { GlobalLayout } from '~/layouts';
import { selectSession } from '~/features/session';

export default function Auth({ layout, component, route, isPrivate }) {
  const session = useSelector(selectSession);
  const Layout = layout ? layout : GlobalLayout;

  if (session.status !== 'loading' && !session.user && isPrivate) {
    return (
      <Redirect to="/login" />
    );
  }

  return (
    <Layout Component={component} route={route} />
  )
}
