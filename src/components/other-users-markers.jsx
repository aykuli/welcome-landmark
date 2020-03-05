import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
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

const OtherUser = ({ lat, long, id }) => {
  const styles = useStyles();
  const [showPopup, setShowPopup] = useState(true);
  
  return (
    <>
      <Marker key={id} longitude={long} latitude={lat}>
        {showPopup && (
          <Popup
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
            </div>
          </Popup>
        )}
        <RoomIcon />
      </Marker>
    </>
  );
};

export default OtherUser;

// OtherUsersMarkers.defaultProps = {
//   otherUsers: () => {},
// };

// OtherUsersMarkers.propTypes = {
//   otherUsers: PropTypes.func,
// };
