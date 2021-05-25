import { memo } from 'react';
import TaskList from './TaskList';
import styles from './List.module.css';

const List = memo(function List({ list, dragRef }) {
  return (
    <div className={styles.list}>
      <div ref={dragRef} className={styles.listHead}>
        <div className={styles.listTitle}>
          <h2>{list.title}</h2>
        </div>
        <button className="btn">Create a task</button>
      </div>
      <TaskList tasks={list.tasks} />
    </div>
  )
});

export default List;
