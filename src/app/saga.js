import { all } from 'redux-saga/effects';
import { incrementAsync } from '~/features/counter/counterSlice';
import { signIn } from '~/features/session/sessionSlice';
import { fetchBoard, updateList } from '~/features/board/boardSlice';

export function *rootSaga() {
  yield all([
    signIn.saga(),
    fetchBoard.saga(),
    updateList.saga(),
    incrementAsync.saga(),
  ])
}
