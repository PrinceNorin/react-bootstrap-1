import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, selectSession } from './sessionSlice';

export function SignInForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectSession);
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(signIn({ ...state }));
  }

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="sign-in" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">{t('email')}</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={onChange}
            value={state.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t('password')}</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={onChange}
            value={state.password}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-primary w-100"
          >
            {t('sign_in')}
          </button>
        </div>
      </form>
    </div>
  );
}
