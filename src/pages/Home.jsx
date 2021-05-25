import { Route, Switch } from 'react-router-dom';
import BoardDetail from '~/features/board/BoardDetail';
import TaskDetail from './TaskDetail';

export default function Home() {
  return (
    <div>
      <BoardDetail />
      <Switch>
        <Route path="/:taskId">
          <TaskDetail />
        </Route>
      </Switch>
    </div>
  );
}
