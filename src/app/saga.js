import { all } from 'redux-saga/effects';
import { incrementAsync } from '~/features/counter/counterSlice';
import { signIn } from '~/features/session/sessionSlice';
import { saga as boardSaga } from '~/features/board/boardSlice';

export function *rootSaga() {
  yield all([
    signIn.saga(),
    boardSaga(),
    incrementAsync.saga(),
  ])
}
