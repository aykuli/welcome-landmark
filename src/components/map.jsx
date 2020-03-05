import React, { useState } from 'react';
import MapGL, {
  FlyToInterpolator,
  Marker,
  Popup,
  GeolocateControl,
} from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { makeStyles } from '@material-ui/core/styles';

import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { MAPBOX_TOKEN } from '../static/apiKeys';

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10,
};

const useStyles = makeStyles({
  marker: {
    cursor: 'pointer',
    outline: 'none',
  },
  popup: {
    maxWidth: '70%',

    '& h2': {
      margin: '0 0 10px 0',
    },

    '& p': {
      margin: 0,
    },
  },
});

const Map = ({ lat, long, mapTheme, place }) => {
  const styles = useStyles();
  const [showPopup, setShowPopup] = useState(true);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '400px',
    latitude: lat,
    longitude: long,
    zoom: 8,
    bearing: 0, // азимут
    pitch: 0,
  });

  const gotoCurrentPlace = () => {
    console.log('viewPort: ', viewport);
    const viewportCurrent = {
      ...viewport,
      longitude: long,
      latitude: lat,
      zoom: 8,
      transitionDuration: 'auto',
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    };
    setViewport(viewportCurrent);
  };

  return (
    <>
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={`mapbox://styles/mapbox/${mapTheme}`}
      >
        <Marker latitude={lat} longitude={long} offsetLeft={-13} offsetTop={5}>
          <div
            className={styles.marker}
            onClick={() => setShowPopup(true)}
            role="button"
            tabIndex={0}
          >
            <MyLocationIcon />
          </div>
        </Marker>
        {showPopup && (
          <Popup
            latitude={lat}
            longitude={long}
            onClose={() => setShowPopup(false)}
            closeOnClick={false}
            closeButton
            anchor="bottom"
            className={styles.popup}
          >
            <div>
              <h2>{place.city}</h2>
              <p>{place.country}</p>
            </div>
          </Popup>
        )}

        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        />
      </MapGL>
      <button type="button" onClick={gotoCurrentPlace}>
        Back to current place
      </button>
    </>
  );
};

export default Map;

Map.defaultProps = {
  lat: 0,
  long: 0,
  mapTheme: 'light',
  place: { city: '', country: '' },
};

Map.propTypes = {
  lat: PropTypes.number,
  long: PropTypes.number,
  mapTheme: PropTypes.string,
  place: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }),
};
