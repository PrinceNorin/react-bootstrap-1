import React from 'react';
import PropTypes from 'prop-types';

export function GlobalLayout({ Component, route }) {
  return (
    <div>
      <Component route={route} />
    </div>
  );
}

GlobalLayout.propTypes = {
  route: PropTypes.any.isRequired,
  Component: PropTypes.any.isRequired
};
