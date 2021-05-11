import { all } from 'redux-saga/effects';
import { incrementAsync } from '~/features/counter/counterSlice';

export function *rootSaga() {
  yield all([
    incrementAsync.saga(),
  ])
}
