import { memo, useState } from 'react';
import TaskList from '~/components/Task/TaskList';
import TaskForm from '~/components/Task/TaskForm';
import styles from './List.module.css';

const List = memo(function List({ list, dragRef, onTaskCreated }) {
  const [creating, setCreating] = useState(false);

  const showCreateTaskForm = (event) => {
    setCreating(true);
  }

  const addTaskToTop = (task) => {
    onTaskCreated({ ...task, index: 0 });
    setCreating(false);
  }

  return (
    <div className={styles.list}>
      <div className={styles.listHead}>
        <div ref={dragRef} className={styles.listDraggable}>
          <div className={styles.listTitle}>
            <h2>{list.title}</h2>
          </div>
        </div>
        {creating ? (
          <TaskForm
            listId={list.id}
            onSubmit={addTaskToTop}
            onCancel={() => setCreating(false)}
          />
        ) : (
          <button
            className="btn"
            onClick={showCreateTaskForm}
          >
            Create a task
          </button>
        )}
      </div>
      <TaskList tasks={list.tasks} />
    </div>
  )
});

export default List;
