import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTask, updateTask } from './boardSlice';
import InlineEdit from '~/components/InlineEdit';
import styles from './TaskModal.module.css';

export default function TaskModal({ id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const task = useSelector(selectTask(id));

  if (!task) {
    return null;
  }

  const updateTitle = (title) => {
    dispatch(updateTask({
      ...task,
      title
    }));
  }

  const onHide = () => {
    history.push('/');
  }

  return (
    <Modal show onHide={onHide} animation={false}>
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
