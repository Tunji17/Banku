import React from 'react';
import PropTypes from 'prop-types';

import './notFound.scss';

const NotFound = ({ location }) => (
  <>
    <div className="notfound-body">
      <h1 className="header-notfound">
        Not Found
        <code>{location.pathname}</code>
      </h1>
      <p className="centered">The page you are looking for does not exist...</p>
    </div>
  </>
);

NotFound.propTypes = {
  location: PropTypes.string.isRequired,
};

export default NotFound;
