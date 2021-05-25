import List from './List';

const styles = {
  transform: 'rotate(7deg)',
  WebkitTransform: 'rotate(7deg)'
}

export default function ListDragPreview({ list }) {
  return (
    <div style={styles}>
      <List list={list} />
    </div>
  );
}
