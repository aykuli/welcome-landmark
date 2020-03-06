import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';

import theme from '../static/themes/theme';

const useStyles = makeStyles(themeThere =>
  createStyles({
    formControl: {
      margin: themeThere.spacing(1),
      minWidth: 120,
      '& div': {
        color: themeThere.palette.text.secondary,
      },
    },
    selectEmpty: {
      marginTop: themeThere.spacing(2),
    },
    select: {
      color: themeThere.palette.text.secondary,
    },
  })
);

// TODO переделать button на select и сделать выбр карт побольше  streets light dark outdoors satellite
const MapThemeToggler = ({ mapTheme, handleTheme }) => {
  const classes = useStyles(theme);
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="map-theme-select">Map theme</InputLabel>
        <Select
          labelId="map-theme-select"
          id="map-theme-select"
          value={mapTheme}
          onChange={handleTheme}
          variant="standard"
        >
          <MenuItem value="streets-v11">Streets</MenuItem>
          <MenuItem value="dark-v9">Dark</MenuItem>
          <MenuItem value="satellite-v9">Satellite</MenuItem>
          <MenuItem value="light-v10">Light</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default MapThemeToggler;

MapThemeToggler.defaultProps = {
  mapTheme: 'light',
  handleTheme: () => {},
};

MapThemeToggler.propTypes = {
  mapTheme: PropTypes.string,
  handleTheme: PropTypes.func,
};
