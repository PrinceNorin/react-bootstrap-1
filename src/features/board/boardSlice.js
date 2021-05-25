import { all } from "@redux-saga/core/effects";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from '@reduxjs/toolkit'
import { createSagaAction } from "~/utils";
import {
  fetchBoard as fetchBoardAPI,
  updateList as updateListAPI,
  createTask as createTaskAPI,
  updateTask as updateTaskAPI
} from './boardAPI';

const initialState = {
  status: 'idle',
  board: null
};

export const fetchBoard = createSagaAction(
  'board/fetchBoard',
  async () => {
    const { data } = await fetchBoardAPI();
    return data;
  }
);

export const updateList = createSagaAction(
  'board/updateList',
  async (payload) => {
    await updateListAPI(payload.id, {
      index: payload.index
    });
    return payload;
  }
)

export const createTask = createSagaAction(
  'board/createTask',
  async (task) => {
    const { data } = await createTaskAPI(task);
    return data;
  }
)

export const updateTask = createSagaAction(
  'board/updateTask',
  async (task) => {
    const { data } = await updateTaskAPI(task.id, task);
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
        const { payload: { index } } = action;
        const lists = state.board.lists;

        lists[index].index = index;
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
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, title, listId } = action.payload;
        const list = state.board.lists.find(list => list.id === listId);
        const task = list.tasks.find(task => task.id === id);

        task.title = title;
      })
  }
});

export const { moveList } = boardSlice.actions;

export const selectBoard = (state) => state.board;

export const selectTask = (taskId) => createSelector(
  selectBoard,
  ({ board }) => {
    if (!board) {
      return null;
    }
  
    for (let i = 0; i< board.lists.length; i++) {
      const tasks = board.lists[i].tasks || [];
      const task = tasks.find(task => task.id === taskId);
  
      if (task) {
        return task;
      }
    }
  
    return null;
  }
);

export function *saga() {
  yield all([
    fetchBoard.saga(),
    updateList.saga(),
    createTask.saga(),
    updateTask.saga(),
  ]);
}

export default boardSlice.reducer;
