import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SignIn.module.css';

export default function SignIn() {
  const { t } = useTranslation();

  return (
    <div className={styles.signin}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">
            {t('sign_in')}
          </h3>
          <form>
            <div className="form-group">
              <label htmlFor="email">{t('email')}</label>
              <input type="email" name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">{t('password')}</label>
              <input type="password" name="password" className="form-control" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-100">{t('sign_in')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
