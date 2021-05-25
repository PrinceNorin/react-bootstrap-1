import { useEffect, useRef, useState } from "react";
import styles from './TaskForm.module.css';

export default function TaskForm({ listId, onSubmit, onCancel }) {
  const ref = useRef(null);
  const [task, setTask] = useState({
    title: ''
  });

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...task, listId });
    setTask({ title: '' });
  }

  const handleCancel = (event) => {
    event.preventDefault();
    setTask({ title: '' });
    onCancel();
  }

  const updateTask = (event) => {
    const { value } = event.target;
    setTask({ title: value });
  }

  return (
    <div className={styles.taskForm}>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={ref}
          value={task.title}
          onChange={updateTask}
          className="form-control"
          placeholder="Task name"
        />
        <div className={styles.buttonGroup}>
          <button onClick={handleCancel} className="btn">Cancel</button>
          <button className="btn">Add</button>
        </div>
      </form>
    </div>
  );
}
