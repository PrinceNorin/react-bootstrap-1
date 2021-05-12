import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavDropdown } from 'react-bootstrap';

export default function Navigation() {
  const { t, i18n } = useTranslation();

  const changeLang = (event, lang) => {
    event.preventDefault();
    i18n.changeLanguage(lang);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Counter</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              {t('hello.world')}
            </Link>
          </li>
          <NavDropdown title={i18n.language}>
            <NavDropdown.Item onClick={(event) => changeLang(event, 'en')}>
              English
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(event) => changeLang(event, 'km')}>
              Khmer
            </NavDropdown.Item>
          </NavDropdown>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}
