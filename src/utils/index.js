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
        const { response } = err;

        // http request error
        if (response) {
          yield put(rejected(response.data));
        } else {
          yield put(rejected({ message: err.message }));
        }
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
