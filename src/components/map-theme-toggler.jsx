import React from 'react';
import PropTypes from 'prop-types';
// TODO переделать button на select и сделать выбр карт побольше  streets light dark outdoors satellite
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
