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

const OtherUsersMarkers = ({ otherUsers }) => {
  const styles = useStyles();
  const [showPopup, setShowPopup] = useState(true);
  return (
    <>
      {otherUsers.map(coors => {
        const { id, latitude, longitude } = coors;
        console.log(coors);
        return (
          <Marker key={id} longitude={latitude} latitude={longitude}>
            <RoomIcon />
            {showPopup && (
              <Popup
                latitude={latitude}
                longitude={longitude}
                onClose={() => setShowPopup(false)}
                closeOnClick={false}
                closeButton
                anchor="bottom"
                className={styles.popup}
              >
                <div>
                  <h2>{id}</h2>
                </div>
              </Popup>
            )}
          </Marker>
        );
      })}
    </>
  );
};

export default OtherUsersMarkers;

// OtherUsersMarkers.defaultProps = {
//   otherUsers: () => {},
// };

// OtherUsersMarkers.propTypes = {
//   otherUsers: PropTypes.func,
// };
