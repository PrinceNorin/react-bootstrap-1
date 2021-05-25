import List from './List';
import { ItemTypes } from "~/features/board/ItemTypes";
import { useDragLayer } from 'react-dnd';

const styles = {
  zIndex: 100,
  left: 0,
  right: 0,
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%'
}

const getItemStyles = (initialOffset, currentOffset) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y - 60}px)`;

  return {
    transform,
    height: '100%',
    WebkitTransform: transform
  };
}

export default function ListDragLayer({ list }) {
  const { item, itemType, currentOffset, initialOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    initialOffset: monitor.getInitialClientOffset()
  }))

  return (
    <div style={styles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {itemType === ItemTypes.CARD ? (
          <List list={item.list} />
        ) : null}
      </div>
    </div>
  );
}
