import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';

import theme from '../static/themes/theme';

const MarkerAndPopup = ({
  lat,
  long,
  id,
  info,
  isCurrent,
  isShowOthers,
  color,
  handleSave,
}) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  useEffect(() => {
    if (isCurrent) {
      setIsShowPopup(true);
    }
  }, [isCurrent]);

  const useStyles = makeStyles({
    marker: {
      transform: 'translate(0, 0)',
      color: 'red',
    },
    currentUserMarker: {
      position: 'relative',
      cursor: 'pointer',
      outline: 'none',
      '& svg': {
        fill: theme.palette.error.main,
      },
    },
    otherUserMarker: {
      position: 'relative',
      cursor: 'pointer',
      outline: 'none',
      '& svg': {
        fill: color,
      },
    },
    popup: {
      maxWidth: '70%',
      transform: 'none',

      '& h2': {
        margin: '0 0 10px 0',
      },
      '& p': {
        margin: 0,
      },
      '& .mapboxgl-popup-content': {
        minWidth: 50,
        boxShadow: '2px 2px 10px rgba(0, 0, 0, .53)',
      },
    },
  });

  const styles = useStyles();

  return isCurrent || isShowOthers ? (
    <>
      <Marker
        key={id}
        longitude={long}
        latitude={lat}
        offsetLeft={-13}
        offsetTop={5}
      >
        <div
          className={
            isCurrent ? styles.currentUserMarker : styles.otherUserMarker
          }
          onClick={() => setIsShowPopup(!isShowPopup)}
          onKeyDown={() => setIsShowPopup(true)}
          role="button"
          tabIndex={0}
        >
          <RoomIcon />
        </div>
      </Marker>
      {isShowPopup && (
        <Popup
          offsetLeft={0}
          offsetTop={27}
          latitude={lat}
          longitude={long}
          onClose={() => setIsShowPopup(false)}
          closeOnClick={false}
          closeButton
          anchor="left"
          className={styles.popup}
        >
          <div>
            <SaveIcon
              onClick={handleSave}
              onKeyDown={handleSave}
              tabIndex={0}
              color="primary"
              fontSize="small"
              style={{ cursor: 'pointer' }}
            />
            <Divider />
            <Typography variant="h5">{id}</Typography>
            <Typography variant="body1">city: {info.city}</Typography>
            <Typography variant="body1">country: {info.country}</Typography>
          </div>
        </Popup>
      )}
    </>
  ) : null;
};

export default MarkerAndPopup;

MarkerAndPopup.defaultProps = {
  lat: 0,
  long: 0,
  id: 0,
  info: { coutry: '', city: '' },
  isCurrent: false,
  isShowOthers: true,
  color: theme.palette.primary.main,
  handleSave: () => {},
};

MarkerAndPopup.propTypes = {
  lat: PropTypes.number,
  long: PropTypes.number,
  id: PropTypes.number,
  info: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  isCurrent: PropTypes.bool,
  isShowOthers: PropTypes.bool,
  color: PropTypes.string,
  handleSave: PropTypes.func,
};
