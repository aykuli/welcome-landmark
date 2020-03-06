import React, { useState } from 'react';
import MapGL, { FlyToInterpolator, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { easeCubic } from 'd3-ease';
import PropTypes from 'prop-types';

import { MAPBOX_TOKEN } from '../static/api-keys';
import otherUsersCoors from '../static/mock/other-users';
import MarkerAndPopup from './marker-popup';
import colorGenerator from '../utils/color-generator';
import theme from '../static/themes/theme';

const colors = colorGenerator(otherUsersCoors(), theme.palette.info.main);
console.log(colors);

const Map = ({ lat, long, mapTheme }) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '400px',
    latitude: lat,
    longitude: long,
    zoom: 10,
    bearing: 0, // азимут
    pitch: 0,
  });
  const [isShowOthers, setIsShowOthers] = useState(true);

  const gotoCurrentPlace = () => {
    const viewportCurrent = {
      ...viewport,
      longitude: long,
      latitude: lat,
      zoom: 13,
      transitionDuration: 'auto',
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    };
    setViewport(viewportCurrent);
  };

  const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  };

  const toggleOthers = () => {
    setIsShowOthers(!isShowOthers);
  };
  const otherUsers = otherUsersCoors(lat, long);

  return (
    <>
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={`mapbox://styles/mapbox/${mapTheme}`}
      >
        <MarkerAndPopup
          lat={lat}
          long={long}
          id={0}
          info="Current User"
          isCurrent
          color={theme.palette.primary.main}
        />
        {otherUsers.map((userData, i) => {
          const { id, latitude, longitude, info } = userData;
          return (
            <MarkerAndPopup
              key={id}
              lat={latitude}
              long={longitude}
              id={id}
              info={info}
              isCurrent={false}
              isShowOthers={isShowOthers}
              color={colors[i]}
            />
          );
        })}

        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        />
      </MapGL>
      <div>
        <button type="button" onClick={gotoCurrentPlace}>
          Back to current place
        </button>
        <button type="button" onClick={toggleOthers}>
          {isShowOthers ? 'Hide ' : 'Show '}other user&apos;s
        </button>
      </div>
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
