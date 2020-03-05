import React, { useState } from 'react';
import MapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

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
      >
        <Marker
          latitude={lat}
          longitude={long}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>You are here</div>
        </Marker>
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
};

Map.propTypes = {
  lat: PropTypes.number,
  long: PropTypes.number,
};
