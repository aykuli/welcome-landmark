import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN } from '../static/apiKeys';

const Map = ({ lat, long}) => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: lat,
    longitude: long,
    zoom: 8
  });

  return (
    <MapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    />
  );
};

export default Map;