import React from 'react';
import PropTypes from 'prop-types';

const MapThemeToggler = ({ buttonText, toggleTheme }) => {
  return (
    <>
      <button type="button" onClick={toggleTheme}>
        Switch to {buttonText}
      </button>
    </>
  );
};

export default MapThemeToggler;

MapThemeToggler.defaultProps = {
  buttonText: 'light',
  toggleTheme: () => {},
};

MapThemeToggler.propTypes = {
  buttonText: PropTypes.string,
  toggleTheme: PropTypes.func,
};
