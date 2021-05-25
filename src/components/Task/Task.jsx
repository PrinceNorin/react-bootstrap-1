import styles from './Task.module.css';

export default function Task({ list, task, onClick }) {
  const handleClick = () => {
    onClick(task, list);
  }

  return (
    <div className={styles.task} onClick={handleClick}>
      <div className={styles.taskContent}>
        <span>#{task.id}</span>
        <h5>{task.title}</h5>
        <div className={styles.taskTime}></div>
      </div>
    </div>
  );
}
