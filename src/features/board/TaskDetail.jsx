import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateTask } from './boardSlice';
import InlineEdit from '~/components/InlineEdit';
import styles from './TaskDetail.module.css';

export default function TaskDetail({ task, onHide }) {
  const dispatch = useDispatch();

  const updateTitle = (title) => {
    dispatch(updateTask({
      ...task,
      title
    }));
  }

  return (
    <Modal show={!!task} onHide={onHide} animation={false}>
      <Modal.Body>
        <div className={styles.taskDetailHead}>
          <span>#{task.id}</span>
          <div className={styles.taskDetailTitle}>
            <InlineEdit value={task.title} onChange={updateTitle}>
              <h3>{task.title}</h3>
            </InlineEdit>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
