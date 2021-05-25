import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSession, setSession } from '~/features/session';
import storage from '~/utils/storage';

export default function useGlobal() {
  const { user } = useSelector(selectSession);
  const dispatch = useDispatch();

  const signOut = useCallback(() => {
    storage.removeToken();
    dispatch(setSession({
      user: null,
      jwt: null
    }));
  }, [dispatch]);

  useEffect(() => {
    const session = storage.getSession();
    if (session) {
      dispatch(setSession(session));
    }
  }, [dispatch]);

  // adding global context such as User, Session
  return {
    user,
    signOut,
  };
}
