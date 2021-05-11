import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '~/components/Navigation';

export function AppLayout({ Component, route }) {
  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Component route={route} />
          </div>
        </div>
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  route: PropTypes.any.isRequired,
  Component: PropTypes.any.isRequired
};
