import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SignInForm, selectSession } from '~/features/session';
import styles from './SignIn.module.css';

export default function SignIn() {
  const { t } = useTranslation();
  const { jwt } = useSelector(selectSession);

  // sign in success
  if (jwt && jwt.token) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div className={styles.signin}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">
            {t('sign_in')}
          </h3>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
