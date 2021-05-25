import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableList, ListDragLayer } from '~/components/List';
import {
  fetchBoard,
  selectBoard,
  moveList as moveListAction,
  createTask as createTaskAction,
  updateList as updateListAction,
} from '~/features/board/boardSlice';

import TaskDetail from './TaskDetail';
import styles from './BoardDetail.module.css';

const getCurrentTask = (board, id) => {
  if (!board) {
    return null;
  }

  for (let i = 0; i< board.lists.length; i++) {
    const tasks = board.lists[i].tasks || [];
    const task = tasks.find(task => task.id === id);

    if (task) {
      return task;
    }
  }

  return null;
}

export default function BoardDetail() {
  const dispatch = useDispatch();
  const [currentTaskId, setCurrentTaskId] = useState(-1);
  const { status, board } = useSelector(selectBoard);

  useEffect(() => {
    dispatch(fetchBoard());
  }, [dispatch]);

  const moveList = useCallback((dragIndex, hoverIndex, isDrop) => {
    if (isDrop) {
      const dragList = board.lists[hoverIndex];
      const payload = {
        id: dragList.id,
        index: hoverIndex
      }
      dispatch(updateListAction(payload));
    } else {
      const payload = { dragIndex, hoverIndex };
      dispatch(moveListAction(payload));
    }
  }, [dispatch, board]);

  const createTask = (task) => {
    dispatch(createTaskAction(task));
  }

  const openTask = (task) => {
    setCurrentTaskId(task.id);
  }

  const closeTask = () => {
    setCurrentTaskId(-1);
  }

  const renderList = (list, index) => {
    return (
      <DraggableList
        list={list}
        index={index}
        key={list.id}
        moveList={moveList}
        onTaskClick={openTask}
        onTaskCreated={createTask}
      />
    )
  }

  return (
    <div>
      {currentTaskId !== -1 ? (
        <TaskDetail
          onHide={closeTask}
          task={getCurrentTask(board, currentTaskId)}
        />
      ) : null}
      <DndProvider backend={HTML5Backend}>
        <div className={styles.boardDetail}>
          <ListDragLayer />
          {status === 'loading' ? (
            <p className="text-center">Loading...</p>
          ) : null}
          {board && (
            board.lists.map((list, index) => renderList(list, index))
          )}
        </div>
      </DndProvider>
    </div>
  )
}
