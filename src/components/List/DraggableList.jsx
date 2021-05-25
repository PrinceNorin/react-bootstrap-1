import { useEffect, useRef, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '~/features/board/ItemTypes';
import { getEmptyImage } from 'react-dnd-html5-backend';
import List from './List';

const getStyles = (isDragging) => ({
  opacity: isDragging ? 0 : 1,
  height: isDragging ? 0 : ''
});

const DraggableList = memo(function DraggableList({ list, index, moveList, onTaskCreated, onTaskClick }) {
  const dropRef = useRef(null);
  const dragRef = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover: (item, monitor) => {
      if (!dropRef.current) {
        return;
      }
  
      const dragIndex = item.index;
      const hoverIndex = index;
  
      if (dragIndex === hoverIndex) {
        return;
      }
  
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - clientOffset.right;
  
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
  
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
  
      moveList(dragIndex, hoverIndex, false);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({
      list,
      index
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: (item) => {
      moveList(item.list.index, item.index, true);
    }
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(dragRef);
  drop(dropRef);

  return (
    <div ref={dropRef} style={getStyles(isDragging)} data-handler-id={handlerId}>
      <List
        list={list}
        dragRef={dragRef}
        onTaskClick={onTaskClick}
        onTaskCreated={onTaskCreated}
      />
    </div>
  )
});

export default DraggableList;
