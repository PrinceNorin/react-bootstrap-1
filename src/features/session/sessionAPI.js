import axios from 'axios';

export const authenticate = ({ email, password }) => {
  return axios.post('http://localhost:3001/token', {
    email,
    password
  });
}
