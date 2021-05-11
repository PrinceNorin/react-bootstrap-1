import React from 'react';
import styles from './SignIn.module.css';

export default function SignIn() {
  return (
    <div className={styles.signin}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Sign In</h3>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
