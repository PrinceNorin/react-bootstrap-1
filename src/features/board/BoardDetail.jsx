import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchBoard, selectBoard, updateList as updateListAction, moveList as moveListAction } from '~/features/board/boardSlice';
import { selectSession } from '~/features/session';
import { DraggableList, ListDragLayer } from '~/components/List';
import styles from './BoardDetail.module.css';

export default function BoardDetail() {
  const dispatch = useDispatch();
  const { status, board } = useSelector(selectBoard);
  const { jwt: { token } } = useSelector(selectSession);

  useEffect(() => {
    dispatch(fetchBoard(token));
  }, [dispatch, token]);

  const moveList = useCallback((dragIndex, hoverIndex, isDrop) => {
    if (isDrop) {
      const dragList = board.lists[hoverIndex];
      const payload = {
        id: dragList.id,
        token,
        newIndex: hoverIndex
      }
      dispatch(updateListAction(payload));
    } else {
      const payload = { dragIndex, hoverIndex };
      dispatch(moveListAction(payload));
    }
  }, [dispatch, board, token])

  const renderList = (list, index) => {
    return (
      <DraggableList
        list={list}
        index={index}
        key={list.id}
        moveList={moveList}
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
