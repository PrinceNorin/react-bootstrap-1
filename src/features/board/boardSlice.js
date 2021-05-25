import { all } from "@redux-saga/core/effects";
import { createSlice } from "@reduxjs/toolkit";
import { createSagaAction } from "~/utils";
import {
  fetchBoard as fetchBoardAPI,
  updateList as updateListAPI,
  createTask as createTaskAPI
} from './boardAPI';

const initialState = {
  status: 'idle',
  board: null
};

export const fetchBoard = createSagaAction(
  'board/fetchBoard',
  async (token) => {
    const { data } = await fetchBoardAPI(token);
    return data;
  }
);

export const updateList = createSagaAction(
  'board/moveList',
  async (payload) => {
    await updateListAPI(payload.id, {
      index: payload.newIndex
    }, payload.token);
    return payload;
  }
)

export const createTask = createSagaAction(
  'board/createTask',
  async (payload) => {
    const { task, token } = payload;
    const { data } = await createTaskAPI(task, token);
    return data;
  }
)

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    moveList: (state, action) => {
      const { payload } = action;
      const { dragIndex, hoverIndex } = payload;
      const dragList = state.board.lists[dragIndex];
      const hoverList = state.board.lists[hoverIndex];

      state.board.lists[hoverIndex] = dragList;
      state.board.lists[dragIndex] = hoverList;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.status = 'idle';
        state.board = {
          ...action.payload,
          lists: action.payload.lists.map((list, index) => {
            list.index = index;
            return list;
          })
        };
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const { payload: { newIndex } } = action;
        const newLists = [...state.board.lists];

        newLists[newIndex].index = newIndex;
        state.board.lists = newLists

        // const { dragIndex, hoverIndex } = payload;
        // const dragList = state.board.lists[dragIndex];
        // const hoverList = state.board.lists[hoverIndex];

        // state.board.lists[hoverIndex] = dragList;
        // state.board.lists[dragIndex] = hoverList;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const lists = state.board.lists;
        const task = action.payload;
        const listIndex = lists.findIndex(list => list.id === task.listId);

        if (listIndex !== -1) {
          lists[listIndex].tasks.splice(task.index, 0, {
            id: task.id,
            title: task.title
          });
        }
      })
  }
});

export const { moveList } = boardSlice.actions;

export const selectBoard = (state) => state.board;

export function *saga() {
  yield all([
    fetchBoard.saga(),
    updateList.saga(),
    createTask.saga()
  ]);
}

export default boardSlice.reducer;
