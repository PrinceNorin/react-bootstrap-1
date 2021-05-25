import axios from 'axios';

export const fetchBoard = (token) => {
  return axios.get('http://localhost:3001/board', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const updateList = (id, payload, token) => {
  return axios.patch(`http://localhost:3001/list/${id}`, payload, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}
