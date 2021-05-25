import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '~/components/Navigation';

export function AppLayout({ Component, route }) {
  return (
    <div>
      <Navigation />
      <Component route={route} />
    </div>
  );
}

AppLayout.propTypes = {
  route: PropTypes.any.isRequired,
  Component: PropTypes.any.isRequired
};
