import styles from './TaskList.module.css';

export function Task({ task }) {
  return (
    <div className={styles.task}>
      <div className={styles.taskContent}>
        <span>#{task.id}</span>
        <h5>{task.title}</h5>
        <div className={styles.taskTime}></div>
      </div>
    </div>
  );
}

export default function TaskList({ tasks }) {
  return (
    <div className={styles.taskList}>
      {tasks.map(task => <Task task={task} key={task.id} />)}
    </div>
  )
}
