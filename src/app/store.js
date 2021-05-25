import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '~/features/counter/counterSlice';
import sessionReducer from '~/features/session/sessionSlice';
import boardReducer from '~/features/board/boardSlice';
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
    session: sessionReducer,
    board: boardReducer
  },
  middleware
});

sagaMiddleware.run(rootSaga)
