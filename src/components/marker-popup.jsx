import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
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
        fill: theme.palette.primary.main,
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
            <Typography variant="h5">{id}</Typography>
            <Typography variant="body1">{info}</Typography>
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
  info: '',
  isCurrent: false,
  isShowOthers: true,
  color: theme.palette.primary.main,
};

MarkerAndPopup.propTypes = {
  lat: PropTypes.number,
  long: PropTypes.number,
  id: PropTypes.number,
  info: PropTypes.string,
  isCurrent: PropTypes.bool,
  isShowOthers: PropTypes.bool,
  color: PropTypes.string,
};
