import Task from './Task';

const styles = {
  overflowX: 'hidden',
  height: '100%',
  padding: '2px 10px 0 10px'
}

export default function TaskList({ list, tasks, onTaskClick }) {
  return (
    <div style={styles}>
      {tasks.map(task => (
        <Task
          list={list}
          key={task.id}
          task={task}
          onClick={onTaskClick}
        />
      ))}
    </div>
  )
}
