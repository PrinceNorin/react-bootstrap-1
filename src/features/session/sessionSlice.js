import { createSlice } from '@reduxjs/toolkit';
import { createSagaAction } from '~/utils';
import { authenticate } from './sessionAPI';
import storage from '~/utils/storage';

const initialState = {
  user: null,
  error: '',
  status: 'idle',
  jwt: null
};

export const signIn = createSagaAction(
  'session/signIn',
  async (payload) => {
    const { data: { token } } = await authenticate(payload);

    storage.saveToken(token);
    return storage.getSession();
  }
)

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { payload } = action;

      state.jwt = payload.jwt;
      state.user = payload.user;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'idle';
        sessionSlice.caseReducers.setSession(state, {
          payload: action.payload
        });
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
  }
})

export const { setSession } = sessionSlice.actions;

export const selectSession = (state) => state.session;

export default sessionSlice.reducer;
