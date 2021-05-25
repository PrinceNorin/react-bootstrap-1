import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useHistory } from 'react-router-dom';
import { DraggableList, ListDragLayer } from '~/components/List';
import {
  fetchBoard,
  selectBoard,
  moveList as moveListAction,
  createTask as createTaskAction,
  updateList as updateListAction,
} from '~/features/board/boardSlice';

import styles from './BoardDetail.module.css';

export default function BoardDetail() {
  const history = useHistory();
  const dispatch = useDispatch();
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
    history.push(`/${task.id}`);
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
  )
}
