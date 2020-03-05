import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { MAPBOX_TOKEN } from '../static/apiKeys';

const Map = ({ lat, long }) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '400px',
    latitude: lat,
    longitude: long,
    zoom: 8,
  });

  const onViewportChange = viewPort => {
    console.log('viewPort: ', viewPort);
    if (viewPort.longitude > 0) {
        viewPort.longitude = 0;
    }
    setViewport(viewPort);
  };

  return (
    <>
      <MapGL
        {...viewport}
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
      {/* <button onClick={getCurrentPlace}>Current place</button> */}
    </>
  );
};

export default Map;

Map.defaultProps = {
  lat: 0,
  long: 0,
};

Map.propTypes = {
  lat: PropTypes.number,
  long: PropTypes.number,
};
