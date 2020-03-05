import React from 'react';
import MapGL, {
  FlyToInterpolator,
  Marker,
  Popup,
  GeolocateControl,
} from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  marker: {
    cursor: 'pointer',
    outline: 'none',
    '& svg': {
      fill: '#ff5555',
    },
  },
  popup: {
    maxWidth: '70%',

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

const OtherUsersMarkers = otherUsers => {
  const styles = useStyles();
  console.log(otherUsers);
  return (
    <>
      {/* <Marker
        key={city.name}
        longitude={city.longitude}
        latitude={city.latitude}
      > */}
        <RoomIcon />
      {/* </Marker> */}
      )
    </>
  );
};

export default OtherUsersMarkers;

OtherUsersMarkers.defaultProps = {
  otherUsers: [],
};

OtherUsersMarkers.propTypes = {
  otherUsers: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ),
};
