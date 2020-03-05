import React, { useState } from 'react';
import MapGL, {
  FlyToInterpolator,
  Marker,
  GeolocateControl,
} from 'react-map-gl';
import { easeCubic } from 'd3-ease';

import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { MAPBOX_TOKEN } from '../static/apiKeys';

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10,
};

const Map = ({ lat, long, mapTheme }) => {
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
};

Map.propTypes = {
  lat: PropTypes.number,
  long: PropTypes.number,
  mapTheme: PropTypes.string,
};
