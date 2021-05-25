import axios from 'axios';
import storage from '~/utils/storage';

const request = () => {
  const { jwt } = storage.getSession();

  let headers = null;
  if (jwt && jwt.token) {
    headers = {
      'Authorization': `Bearer ${jwt.token}`
    };
  }

  return axios.create({
    headers
  });
}

export const fetchBoard = () => {
  return request().get('http://localhost:3001/board');
}

export const updateList = (id, payload) => {
  return request().patch(`http://localhost:3001/list/${id}`, payload);
}

export const createTask = (task) => {
  return request().post('http://localhost:3001/tasks', task);
}

export const updateTask = (id, task) => {
  return request().patch(`http://localhost:3001/tasks/${id}`, task);
}
