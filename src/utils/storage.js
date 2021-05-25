import jwtDecode from 'jwt-decode';

const tokenSessionKey = '_token';

const storage = {
  saveToken(token) {
    localStorage.setItem(tokenSessionKey, token);
  },
  removeToken() {
    localStorage.removeItem(tokenSessionKey);
  },
  getSession() {
    const token = localStorage.getItem(tokenSessionKey);
    let session = { jwt: null, user: null };

    if (token) {
      const decoded = jwtDecode(token);
      session = {
        jwt: {
          token,
          iat: decoded.iat
        },
        user: decoded.payload
      }
    }

    return session;
  }
}

export default storage;
