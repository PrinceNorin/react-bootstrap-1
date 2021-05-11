import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '~/features/counter/counterSlice';
import { rootSaga } from '~/app/saga';

// Customize middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: false }),
  sagaMiddleware,
]

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware
});

sagaMiddleware.run(rootSaga)
