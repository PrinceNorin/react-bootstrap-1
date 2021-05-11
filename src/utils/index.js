import { createAction } from '@reduxjs/toolkit';
import { call, fork, put, takeEvery } from 'redux-saga/effects';

export const createSagaAction = (typePrefix, payloadCreator) => {
  const pending = createAction(`${typePrefix}/pending`);
  const fulfilled = createAction(`${typePrefix}/fulfilled`);
  const rejected = createAction(`${typePrefix}/rejected`);

  function *callAsync({ payload }) {
    yield fork(function* () {
      try {
        const result = yield call(payloadCreator, payload);
        yield put(fulfilled(result));
      } catch (err) {
        yield put(rejected(err));
      }
    });
  }

  function *actionSaga() {
    yield takeEvery(pending, callAsync);
  }

  return Object.assign(pending, {
    pending,
    fulfilled,
    rejected,
    saga: actionSaga
  });
}
