import { useParams } from 'react-router-dom';
import TaskModal from '~/features/board/TaskModal';

export default function TaskDetail() {
  const { taskId } = useParams();

  return (
    <TaskModal id={parseInt(taskId)} />
  );
}
