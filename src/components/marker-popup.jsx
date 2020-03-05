import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
      fill: '#ff5555',
    },
  },
  otherUserMarker: {
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
    '& svg': {
      fill: '#5555ff',
    },
  },

  popup: {
    maxWidth: '70%',
    transform: 'none',

    '& h2': {
      fontSize: 14,
      margin: '0 0 10px 0',
    },

    '& p': {
      fontSize: 12,
      margin: 0,
    },
  },
});

const MarkerAndPopup = ({ lat, long, id, info, isCurrent }) => {
  const styles = useStyles();
  const [showPopup, setShowPopup] = useState(true);

  return (
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
          onClick={() => setShowPopup(true)}
          onKeyDown={() => setShowPopup(true)}
          role="button"
          tabIndex={0}
        >
          <RoomIcon />
        </div>
      </Marker>
      {showPopup && (
        <Popup
          offsetLeft={0}
          offsetTop={0}
          latitude={lat}
          longitude={long}
          onClose={() => setShowPopup(false)}
          closeOnClick={false}
          closeButton
          anchor="right"
          className={styles.popup}
        >
          <div>
            <h2>{id}</h2>
            <p>{info}</p>
          </div>
        </Popup>
      )}
    </>
  );
};

export default MarkerAndPopup;

MarkerAndPopup.defaultProps = {
  lat: 0,
  long: 0,
  id: 0,
  info: '',
  isCurrent: false,
};

MarkerAndPopup.propTypes = {
  lat: PropTypes.number,
  long: PropTypes.number,
  id: PropTypes.number,
  info: PropTypes.string,
  isCurrent: PropTypes.bool,
};
